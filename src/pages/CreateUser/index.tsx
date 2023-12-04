import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, dbFirestore } from '../../api/firebase';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LabeledInput from '../../components/LabeledInput';
import './styles.scss';
import { doc, setDoc } from 'firebase/firestore';

interface CreateUserProps {
    open?: boolean;
    onClose: () => void;
}

export default function CreateUser(props: CreateUserProps) {
    const [hide, setHide] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [giftList, setGiftList] = useState('');

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await setDoc(doc(dbFirestore, 'participantes', user.uid), {
                    name: name,
                    cellphone: cellphone,
                    email: email,
                    giftList: giftList,
                    hiddenFriend: ""
                });
                props.onClose();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function emailMask(url: string) {
        setEmail(url.replace(/\s/g, ''));
    }

    function cellphoneMask(number: string) {
        setCellphone(number.replace(/\D+/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d{4}).*/, '$1-$2'));
    }

    return (
        <div className='dark-background'>
            <div className='popup-container'>
                <h2>Preencha suas informações</h2>
                <form onSubmit={(form) => handleCreate(form)}>
                    <LabeledInput required
                        label={'Nome'} 
                        value={name} 
                        type={'text'} 
                        onChange={({ currentTarget }) => { setName(currentTarget.value) }} 
                    />
                    <LabeledInput required
                        label={'Celular'} 
                        value={cellphone} 
                        type={'tel'} 
                        onChange={({ currentTarget }) => { cellphoneMask(currentTarget.value) }} 
                    />
                    <LabeledInput required
                        label={'Email'} 
                        value={email} 
                        type={'email'} 
                        onChange={({ currentTarget }) => { emailMask(currentTarget.value) }} 
                    />
                    <LabeledInput required
                        label={'Senha'} 
                        value={password} 
                        type={hide ? 'password' : 'text'} 
                        onChange={({ currentTarget }) => { setPassword(currentTarget.value) }} 
                        action={hide ? <FiEye size={'1.4rem'} /> : <FiEyeOff size={'1.4rem'} />}
                        actionFunction={() => { setHide(!hide) }}
                    />
                    <LabeledInput
                        label={'Sugestões de Presentes'} 
                        value={giftList} 
                        type={'text'} 
                        onChange={({ currentTarget }) => { setGiftList(currentTarget.value) }}
                    />
                    <button type='submit' className='popup-button create'>Criar</button>
                </form>
                <button className='popup-button cancel' onClick={props.onClose}>Cancelar</button>
            </div>
        </div>
    );
}