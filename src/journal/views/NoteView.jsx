import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef, useState } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

const formValidations = {
    title: [ ( value ) => value.length >= 6, 'Debes escribir un título mayor a 6 carateres'],
    body: [ ( value ) => value.length >= 6, 'Debes escribir un detalle mayor a 6 carateres']
}

export const NoteView = () => {

    
    //Validamos si el formulario se ha enviado para manejar los errores de validacion de formulario
    const [formSubmitted, setformSubmitted] = useState(false);

    const dispatch = useDispatch();
    
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState, isFormValid,
            titleValid, bodyValid } = useForm( note, formValidations );

    const dateString = useMemo( () => {
       const newDate = new Date( date );
       return newDate.toUTCString();
    }, [ date ]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState] );

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = ( event ) => {

        event.preventDefault();

        setformSubmitted(true);
    
        if( !isFormValid ) return;

        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        
        if( target.files.length === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    
    <Grid container 
        className="animate__animated animate__fadeIn animate__faster"
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
                type="file"
                multiple
                ref = { fileInputRef }
                onChange = { onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled = { isSaving }
                onClick={ () => fileInputRef.current.click() }
            >

                <UploadOutlined />
            </IconButton>

            <Button 
                onClick = { onSaveNote }
                disabled = { isSaving }
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx= {{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label = "Título"
                sx={{ border: 'none', mb: 1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
                error = { !!titleValid && formSubmitted }
                helperText = { !!titleValid && formSubmitted ? titleValid : '' }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
                error = { !!bodyValid && formSubmitted }
                helperText = { !!bodyValid && formSubmitted ?  bodyValid : '' }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx= {{ mt: 2}}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        {
            !!note.imageUrls &&  <ImageGallery images = { note.imageUrls }/>
        }

    </Grid>
  )
}
