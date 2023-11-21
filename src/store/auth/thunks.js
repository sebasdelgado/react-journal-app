import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { loadNotes } from "../../helpers/loadNotes"
import { clearNoteLogout, setNotes } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = () => {
    
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        //Si ocurre un error disparamos el logout
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserEmailPassword = ({ email, password, displayName }) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }));
    }
}

export const startLogout = () => {

    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( clearNoteLogout() );
        dispatch( logout({ errorMessage: null }) );
    }
}

export const startLoadingNotes = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        
        dispatch( setNotes( notes ) );
    }
}