import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({

  name: 'auth',
  
  initialState: {
    // 'checking', 'not-authenticated', 'authenticated' => ESTADOS. 
    // En el estado checking no debemos mostrar el login porque estamos
    // validando el estado de autenticación entonces se debe mostrar algun espiner o loading
    status: 'checking', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },

  reducers: {
    
    login: ( state, { payload } ) => {
        state.status = 'authenticated';
        state.uid = payload.uid;
        state.email = payload.email;
        state.displayName = payload.displayName;
        state.photoURL = payload.photoURL;
        state.errorMessage = null;
    },

    logout: ( state, { payload } ) => {
        state.status = 'not-authenticated';
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = payload?.errorMessage;
    },

    checkingCredentials: ( state ) => {
        state.status = 'checking';
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions