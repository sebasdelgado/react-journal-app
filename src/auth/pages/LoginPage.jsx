import { Link as RouterLink } from "react-router-dom";
import Google from "@mui/icons-material/Google";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo, useState } from "react";

const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [ ( value ) => value.includes('@'), 'El correo debe tener una @'],
  password: [ ( value ) => value.length >= 6, 'El password debe tener más de 6 o más carateres']
}


export const LoginPage = () => {

  //Validamos si el formulario se ha enviado para manejar los errores de validacion de formulario
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  
  const { formState, email, password, onInputChange,
          isFormValid, emailValid, passwordValid
        } = useForm(formData, formValidations);

  //Si status cambia se obtiene un nuevo valor, si no cambia no se vuelve a calcular 
  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const dispatch = useDispatch();

  const onSubmit  = ( event ) => {
    
    event.preventDefault();

    setformSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startLoginWithEmailPassword(formState) )
  }

  const onGoogleSignIn = () => {
    
    dispatch( startGoogleSignIn() )
  }

  return (
    
    <AuthLayout title="Login">
      <form 
        aria-label="submit-form"
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error = { !!emailValid && formSubmitted }
              helperText = { !!emailValid && formSubmitted ? emailValid : ''}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{
                'data-testid' : 'password'
              }}
              value={ password }
              onChange={ onInputChange }
              error = { !!passwordValid && formSubmitted }
              helperText = { !!passwordValid && formSubmitted ? passwordValid : '' }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '': 'none' }
            >
              <Alert severity="error">{ errorMessage }</Alert>
              
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                disabled = { isAuthenticating }
                type="submit" 
                variant="contained" 
                fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled = { isAuthenticating }
                variant="contained" 
                fullWidth
                aria-label="google-btn"
                onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
       
  )
}
