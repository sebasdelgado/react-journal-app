import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({

  name: 'journal',

  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },

  //Todo lo que va en los reducers es trabajo sincrono, no puede haber funciones asincronas 
  reducers: {

    savingNewNote: ( state ) => {
        state.isSaving = true;
    },

    addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
    },

    setActiveNote: ( state, action ) => {
        state.active = action.payload;
        state.messageSaved = '';
    },

    setNotes: ( state, action ) => {
        state.notes = action.payload;
    },

    setSaving: ( state, action ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },

    updateNote: ( state, action ) => {
      state.isSaving = false;

      state.notes = state.notes.map( note => {
        
        if( note.id === action.payload.id ) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

    },

    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },

    clearNoteLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },

    deleteNoteById: ( state, action ) => {
      
      state.active = null;

      state.notes = state.notes.filter( note => note.id !== action.payload );

      //TODO: hacer la alerta de borrado
      //TODO: arrglar el bug del agregado de la nota cuando este en un nota que existe
      // state.messageSaved = `${ action.payload.title }, borrada correctamente`;
      //TODO: agregar comentario de como se estructura la nota activa en el sliceJournal
    },

  },
});

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNoteLogout,
    deleteNoteById,
    savingNewNote,
} = journalSlice.actions