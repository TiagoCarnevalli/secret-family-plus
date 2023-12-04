import React, { useState } from 'react';
import './styles.scss';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import LabeledInput from '../LabeledInput';

interface Props {
    login: (form: React.FormEvent, email: string, password: string) => void;
}

export default function LoginBox(props: Props) {
    const [hide, setHide] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='login-box-container'>
            <h2>Faça seu Login</h2>
            <form onSubmit={(form) => { props.login(form, email, password) }}>
                <LabeledInput type='email' label='Email' value={email} onChange={({ currentTarget }) => { setEmail(currentTarget.value) }} />
                <LabeledInput 
                    type={hide ? 'password' : 'text'} 
                    label='Senha'
                    value={password} 
                    onChange={({ currentTarget }) => { setPassword(currentTarget.value) }} 
                    action={hide ? <FiEye /> : <FiEyeOff />}
                    actionFunction={() => setHide(!hide)}
                />
                <a href='https://www.google.com/'>Esqueci minha senha</a>
                <button className='login-button' type='submit'>Entrar</button>
            </form>
        </div>
    )
}