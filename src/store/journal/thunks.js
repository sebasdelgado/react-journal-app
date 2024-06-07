import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload } from '../../helpers';

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        const newNote = {
            title : '',
            body : '',
            date : new Date() .getTime(),
        }

        dispatch( setActiveNote( newNote ) );
    }
}


export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        
        if ( !note.id ) { //Si no existe id de nota se procede a crearla en firebase

            const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
            await setDoc( newDoc, note );

            const newNote = { ...note };
            newNote.id = newDoc.id;
            
            dispatch( addNewEmptyNote( newNote ) );
            dispatch( setActiveNote( newNote ) );

            return;
        }

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        
        //Con el objeto merge: true indicamos que consever los campos ya existentes, haga una unión 
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    
    return async ( dispatch ) => {
        
        dispatch( setSaving() );

        //De esta manera subimos los archivos simultaneamente 
        const fileUploadPromises = [];

        for( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note) );

    }
}