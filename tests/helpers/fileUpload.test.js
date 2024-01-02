import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : 'dlgutlyc2',
    api_key : '925674694269325',
    api_secret : '-AFdBeD1k0yfOWE99r-4o9-2SfQ',
    secure : true
})

describe('Pruebas en fileUpload', () => {

    test('Debe subir el archivo correctamente a cloudinary', async() => {

        //Tomamos una imagen de internet y la creamos localmente
        const imageUrl = 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'fotoPrueba.jpg');

        //Validamos que nos devuelva la url como string, si falla devuelve null
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        //Borramos la imagen de cloudinary
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type : 'image'
        });
        // console.log({ cloudResp });
    });

    test('Debe retornar null', async () => {

        const file = new File([], 'fotoPrueba.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
    });
})