import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserEmailPassword } from "../../store/auth";

// const formData = {
//   email: 'sebasdelgado19@gmail.com',
//   password: '123456',
//   displayName: 'Sebastian Delgado'
// }
const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ ( value ) => value.includes('@'), 'El correo debe tener una @'],
  password: [ ( value ) => value.length >= 6, 'El password debe tener más de 6 o más carateres'],
  displayName: [ ( value ) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  //Validamos si el formulario se ha enviado para manejar los errores de validacion de formulario
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid
        } = useForm(formData, formValidations);

  const onSubmit = ( event ) => {

    event.preventDefault();

    setformSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserEmailPassword( formState ) );
    
  }

  return (
    
    <AuthLayout title="Crear una cuenta">

      {/* <h1>Formvalid { isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}

      <form onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error = { !!displayNameValid && formSubmitted }
              helperText = { displayNameValid }
            />
          </Grid>

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
              helperText = { emailValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error = { !!passwordValid && formSubmitted }
              helperText = { passwordValid }
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

            <Grid item xs={12} >
              <Button 
                type = "submit" 
                variant="contained" 
                fullWidth
                disabled = { isCheckingAuthentication }
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
       
  )
}
