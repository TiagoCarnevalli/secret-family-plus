import React, { useState } from 'react';
import './styles.scss';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { dbFirestore, auth } from '../../api/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CreateUser from '../CreateUser';
import LabeledInput from '../../components/LabeledInput';

export default function Home() {
    const [hide, setHide] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creating, setCreating] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const docRef = (await getDoc(doc(dbFirestore, 'participantes', user?.uid))).data();
                console.log(docRef);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='home-container'>
            {creating && <CreateUser onClose={() => setCreating(false)} />}
            <header>
                <h1>Parente Secreto</h1>
                <button className='create-button' onClick={() => setCreating(true)}>Criar</button>
            </header>
            <div className='body-container'>
                <div className='content left-top'>
                    <img className='image' src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/14059.png' alt='Gifts' />
                </div>
                <div className="content right-bottom">
                    <h2>Faça seu Login</h2>
                    <form onSubmit={(form) => { handleLogin(form) }}>
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
            </div>
            <footer style={{ flexDirection: 'column' }}>
                <label>Contatos</label>
                <label>Organizadora - <a href='https://www.google.com/'>Fabinana</a></label>
                <label>Desenvolvedor - <a href='https://www.google.com/'>Tiago</a></label>
            </footer>
        </div>
    );
}