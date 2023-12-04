import React, { useEffect, useState } from 'react';
import './styles.scss';

import CreateUser from '../CreateUser';
import LoginBox from '../../components/LoginBox';
import InfoBox from '../../components/InfoBox';

import { auth, dbFirestore } from '../../api/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { 
    DocumentData, 
    // collection, 
    doc, 
    getDoc, 
    // getDocs, 
    updateDoc } from 'firebase/firestore';

export default function Home() {
    const [creating, setCreating] = useState(false);
    const [loggedUser, setLoggedUser] = useState<DocumentData | null>();
    const [editCount, setEditCount] = useState(0);

    useEffect(() => {
        handleLogged();
    },[editCount])

    async function handleLogged() {
        auth.authStateReady().then(async () => {
            auth!.currentUser?.uid ?
            setLoggedUser((await getDoc(doc(dbFirestore, 'participantes', auth.currentUser!.uid))).data()) :
            setLoggedUser(null);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function handleLogin(e: React.FormEvent, email: string, password: string) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const docRef = await getDoc(doc(dbFirestore, 'participantes', user?.uid));
                setLoggedUser(docRef.data());
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function handleEdit(giftList: string) {
        await updateDoc(doc(dbFirestore, 'participantes', auth.currentUser!.uid), {'giftList': giftList});
        setEditCount(editCount + 1);
    }

    function handleLogout() {
        signOut(auth).then(() => {
            setLoggedUser(null);
            console.log('SignedOut');
        }).catch((error) => {
            console.log(error);
        });
    }

    // async function handleSort() {
    //     let participantes: any[] = [];
    //     (await getDocs(collection(dbFirestore, 'participantes'))).forEach((item) => {
    //         participantes.push(item.id);
    //     })

    //     console.log('Primeira etapa concluída');
        
    //     for (let i = participantes.length - 1; i >= 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [participantes[i], participantes[j]] = [participantes[j], participantes[i]]
    //     }
        
    //     console.log('Segunda etapa concluída');

    //     participantes.forEach(async (item, index) => {
    //         if (index < participantes.length - 1) {
    //             await updateDoc(doc(dbFirestore, 'participantes', item), {'hiddenFriend': participantes[index + 1]});
    //             console.log('Sorteando...');
    //         } else {
    //             await updateDoc(doc(dbFirestore, 'participantes', item), {'hiddenFriend': participantes[0]});
    //             console.log('Último...');
    //         }
    //     })
    // }

    return (
        <div className='home-container'>
            {creating && <CreateUser onClose={() => setCreating(false)} />}
            <header>
                <h1>Parente Secreto</h1>
                {/* <button className='create-button' onClick={() => handleSort()}>Sort</button> */}
                {loggedUser ?
                <button className='create-button' onClick={() => handleLogout()}>Sair</button> :
                <button className='create-button' onClick={() => setCreating(true)}>Criar</button>}
            </header>
            <div className='body-container'>
                <div className='content left-top'>
                    <img className='image' src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/14059.png' alt='Gifts' />
                </div>
                <div className='content right-bottom'>
                    {loggedUser !== null ? <InfoBox user={loggedUser} edit={(value: string) => handleEdit(value)} logout={() => handleLogout()} /> : <LoginBox login={handleLogin} />}
                </div>
            </div>
            <footer style={{ flexDirection: 'column' }}>
                <label><b>Contatos:</b></label>
                <label>Organizadora - <a href='https://wa.me/5535991030363' target='_blank' rel='noreferrer noopener'>Fabiana</a></label>
                <label>Desenvolvedor - <a href='https://wa.me/5535991208775/' target='_blank' rel='noreferrer noopener'>Tiago</a></label>
            </footer>
        </div>
    );
}