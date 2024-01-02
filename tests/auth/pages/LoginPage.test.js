import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";
import { authSlice } from "../../../src/store/auth";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

//Los elementos deben empezar por el nombre mock, de lo contrario no funcionan
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn, //Es una función que regresa un jest.fn()
    startLoginWithEmailPassword : ({ email, password }) => {
        return () =>  mockStartLoginWithEmailPassword({ email, password });
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    //recibe un función y mandamos a llamar esa función, una función que regresa el llamado de esa función 
    useDispatch : () => (fn) => fn(), //Sobreescribimos el comportamiento del useDispatch
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //Definimos como va a lucir el estado
    preloadedState : {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar el componente correctamente', () => {

        render(
            <Provider store = { store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('Boton de google debe llamar el startGoogleSignIn', () => {

        render(
            <Provider store = { store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');        
        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test('submit debe llamar startLoginWithEmailPassword', () => {

        const email = 'sebastian@google.com';
        const password = '123456';

        render(
            <Provider store = { store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        //Obtenenos los componentes de esta manera debido a que son componentes de material-ui
        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value : email }});

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value : password }});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm )

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        });
    });
});