import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { loadNotes } from '../../../src/helpers/loadNotes';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserEmailPassword, startGoogleSignIn, startLoadingNotes, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNoteLogout, setNotes } from '../../../src/store/journal/journalSlice';
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');
jest.mock('../../../src/helpers/loadNotes');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    //Una vez haya terminado se limpian los mocks
    beforeEach( () => jest.clearAllMocks() );

    test('Debe invocar el checkingCredencials', async() => {
        
        //El primer argumento regresa una función y dicha función la ejecutamos con  el argumento del dispatch
        await checkingAuthentication()( dispatch );

        //Evaluamos que el dispatch haya sido llamado con el producto de la función de checkingCredentials
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });


    test('startGoogleSignIn debe llamar a checkingCredencials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk a evaluar
        //El primer argumento regresa una función y dicha función la ejecutamos con  el argumento del dispatch
        await startGoogleSignIn()( dispatch );

        //Evaluamos que haya sido llamada la función del thunk con el producto de la función 
        //checkingCredentials() y login() respectivamente
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData)  );
    });

    test('startGoogleSignIn debe llamar a checkingCredencials y logout - Error', async() => {

        const loginData = { ok: false, errorMessage: 'Un error en Google' };

        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk a evaluar
        //El primer argumento regresa una función y dicha función la ejecutamos con  el argumento del dispatch
        await startGoogleSignIn()( dispatch );

        //Evaluamos que haya sido llamada la función del thunk con el producto de la función 
        //checkingCredentials() y logout() respectivamente
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage )  );
    });


    test('startLoginWithEmailPassword debe llamar checkingCredentials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        //El primer argumento regresa una función y dicha función la ejecutamos con  el argumento del dispatch
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({...demoUser}) );

    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNoteLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: null }) );
        
    });

    test('startCreatingUserEmailPassword debe llamar checkingCredentials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        //El primer argumento regresa una función y dicha función la ejecutamos con  el argumento del dispatch
        await startCreatingUserEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({...demoUser}) );
    });

});