import {useForm} from 'react-hook-form';

import Swal from 'sweetalert2';

import {useEffect, useState} from 'react';

import AppService from '../../services/app.service';



const ProfileForm = ({onSubmit, ...props}) => {


    const profile = props.profileProps;

    const [imageLoaded, setImageLoaded] = useState(false);

    const {register, handleSubmit, formState: {errors, isValid, ...formState}} = useForm({

        mode: 'onChange',

        defaultValues: {

            nombre: '',

            apellido: '',

            email: '',

            dni: ''

        }

    });



    const validateImage = (e) => {

        if(e.target.files.length > 0){

            const file = e.target.files[0];

            try {

                if(file.length > 2097152) throw "La imagen no debe ser mayor a 2MB";

                else if(file.type !== 'image/jpeg' && file.type !== 'image/jpg') throw "Debe ser una imagen en formato JPG";

                setImageLoaded(true);

            } catch (ex) {

                Swal.fire({icon:'error', text: ex});

                e.target.value = "";

                setImageLoaded(false);

            }

        } else {

            setImageLoaded(false);

        }

    }



    const send = (data) => {

        if(!imageLoaded){

            Swal.fire({icon:'error', text:'Debes cargar la foto de tu DNI'});

            return;

        }

        const file = document.getElementById('dni_file').files[0];

        let s = new AppService();

        let fd = new FormData();

        fd.append('_method', 'PUT');

        fd.append('apellido', data.apellido);

        fd.append('nombre', data.nombre);

        fd.append('email', data.email);

        fd.append('dni', data.dni);

        fd.append('dni_file',  file);

        fd.append('api_token', s.getUser().api_token);



        s.makePost('profile', fd, false).then(resp=>{

            Swal.fire({icon:'success', title: 'Éxito', text: 'Nuestro equipo esta revisando la información enviada, espera un poco'});

            onSubmit({...data, dni_status : 1});

        }, err => {

            if(err?.response?.data?.error){

                Swal.fire({icon:'error', text: err.response.data.error});

            } else {

                Swal.fire({icon:'error', text: 'Lo sentimos, hubo un error al procesar la información'});

            }

        });

    }



    return <>

        <form onSubmit={handleSubmit(send)}>

            <ul className='gc-profile-list'>

                <li className='gc-profile-list-item'>

                    <h6 className='gc-list-title'>{profile.email}</h6>

                    <div className='gc-list-text'>

                        <input type="email" maxLength={50} placeholder={profile.writaemail} className='gc-list-text' {...register('email', {

                            required: 'El email es requerido', 

                            pattern: {

                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                                message: 'Debes escribir un formato de correo electrónico válido'

                            }, 

                            maxLength: {

                                value: 50,

                                message: 'Solo se admite 50 caracteres como máximo'

                            }

                        })} required/>

                        { errors?.email && <small>{errors?.email?.message}</small>}

                    </div>

                </li>

                <li className='gc-profile-list-item'>

                    <h6 className='gc-list-title'>{profile.name}</h6>

                    <div className='gc-list-text'>

                        <input type="text" maxLength={50} placeholder={profile.writename} className='gc-list-text' {...register('nombre', {

                            required: 'El nombre es requerido',

                            pattern: {

                                value: /^[a-zA-Z ]+$/,

                                message: 'Solo se admiten letras'

                            },

                            maxLength: {

                                value: 50,

                                message: 'Solo se admite 50 caracteres como máximo'

                            }

                        })} required/>

                        { errors?.nombre && <small>{errors?.nombre?.message}</small>}

                    </div>

                </li>



                <li className='gc-profile-list-item'>

                    <h6 className='gc-list-title'>{profile.lastname}</h6>

                    <div className='gc-list-text'>

                        <input type="text" placeholder={profile.writelastname} className='gc-list-text' {...register('apellido', {

                            required: 'El apellido es requerido',

                            pattern: {

                                value: /^[a-zA-Z ]+$/,

                                message: 'Solo se admiten letras'

                            },

                            maxLength: {

                                value: 50,

                                message: 'Solo se admite 50 caracteres como máximo'

                            }

                        })} required/>

                        { errors?.apellido && <small>{errors?.apellido?.message}</small>}

                    </div>

                </li>

                <li className='gc-profile-list-item'>

                    <h6 className='gc-list-title'>{profile.id}</h6>

                    <div className='gc-list-text'>

                        <input type="number" maxLength={16} step="1" placeholder={profile.writeid} className='gc-list-text' {...register('dni', {

                            required: 'El DNI es requerido',

                            pattern: {

                                value: /[0-9]+/,

                                message: 'Solo se admiten números'

                            },

                            maxLength: {

                                value: 16,

                                message: 'Solo se admite 16 dígitos como máximo'

                            }

                        })} required/>

                        { errors?.dni && <small>{errors?.dni?.message}</small>}

                    </div>

                </li>



                <li className='gc-profile-list-item'>

                    <h6 className='gc-list-title'>{profile.frontid}</h6>

                    <div className='gc-list-text'>

                        <input id="dni_file" name="dni_file" type="file" accept="image/jpeg"  placeholder={profile.adj}  className='gc-list-text' onChange={validateImage}/>

                    </div>

                </li>

            </ul>

            <button className='profile-register-button' disabled={!isValid}>{profile.register}</button>

        </form>

        <style jsx>

            {`

                    .gc-profile-list-item {

                    display: flex;

                    flex-flow: row-reverse nowrap; 

                    align-items: center; 

                    justify-content: space-between;

                    min-height: 48px;

                    margin: 0;

                    padding: 8px 16px;

                    list-style: none;

                    color: #fff;

                    background-color: rgba(0,0,0,.05);

                    border-bottom: 1px solid rgba(0,0,0,.1);

                }

                .gc-list-title {

                    margin: 0;

                    margin-bottom: 4px;

                    font-size: var(--text);

                    font-weight: 400;

                    text-align: end;

                    letter-spacing: 1px;

                    opacity: .75;

                    color: #fff;


                }

                .gc-list-text {

min-width: 60%;

margin: 0;

padding-right: 8px;

font-size: var(--text);

font-weight: 400;


}



.gc-list-text input {

width: 100%;

height: 100%;

background-color: transparent;

border: none;

color: #fff;

font-size: var(--text);

font-weight: 600;

padding: 8px 8px 8px 0;

}



                .profile-register-button {
            padding: 1rem 2rem;

            border-radius: var(--border-radius);

            float: right;

            margin-top: 1rem;

            border: none;

            font-size: var(--button-size);

            font-weight: var(--button-weight);
            background-color: var(--verde);
            color: var(--black);
          }

                `}

        </style>

    </>

}



export default ProfileForm;