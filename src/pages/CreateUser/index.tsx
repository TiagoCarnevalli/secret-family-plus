import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LabeledInput from '../../components/LabeledInput';
import './styles.scss';

export default function CreateUser() {
    const [hide, setHide] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cellphone, setCellphone] = useState('');

    return (
        <div className='dark-background'>
            <div className='popup-container'>
                <h2>Preencha suas informações</h2>
                <form>
                    <LabeledInput 
                        label={'Nome'} 
                        value={name} 
                        type={'text'} 
                        onChange={({ currentTarget }) => { setName(currentTarget.value) }} 
                    />
                    <LabeledInput 
                        label={'Celular'} 
                        value={cellphone} 
                        type={'text'} 
                        onChange={({ currentTarget }) => { setCellphone(currentTarget.value) }} 
                    />
                    <LabeledInput 
                        label={'Email'} 
                        value={email} 
                        type={'email'} 
                        onChange={({ currentTarget }) => { setEmail(currentTarget.value) }} 
                    />
                    <LabeledInput 
                        label={'Senha'} 
                        value={password} 
                        type={hide ? 'password' : 'text'} 
                        onChange={({ currentTarget }) => { setPassword(currentTarget.value) }} 
                        action={hide ? <FiEye size={'1.4rem'} /> : <FiEyeOff size={'1.4rem'} />}
                        actionFunction={() => { setHide(!hide) }}
                    />
                    <button type='submit' className='popup-button create'>Criar</button>
                </form>
                <button className='popup-button cancel'>Cancelar</button>
            </div>
        </div>
    );
}