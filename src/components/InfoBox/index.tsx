import React, { useEffect, useState } from 'react';
import './styles.scss';
import { FiEdit } from 'react-icons/fi';
import LabeledInput from '../LabeledInput';
import { doc, getDoc } from 'firebase/firestore';
import { dbFirestore } from '../../api/firebase';

interface Props {
    logout: () => void;
    user: any;
    edit: (value: string) => void;
}

export default function InfoBox(props: Props) {
    const [edit, setEdit] = useState(false);
    const [giftList, setGiftList] = useState('');
    const [hiddenFriend, setHiddenFriend] = useState<any>();

    useEffect(() => {
        loadHiddenFriend(props.user?.hiddenFriend || ' ')
    }, [props.user?.hiddenFriend]);

    async function loadHiddenFriend(auxId: string) {
        let aux = await getDoc(doc(dbFirestore, 'participantes', auxId));

        setHiddenFriend(aux.data());
    }

    function allowEdit() {
        setGiftList(props.user?.giftList);
        setEdit(true);
    }

    return (
        <div>
            <div className='info-container'>
                <div className='info-content'>
                    <div><strong>Nome:&ensp;</strong><span>{props.user?.name}</span></div>
                    <div><strong>Email:&ensp;</strong><span>{props.user?.email}</span></div>
                    <div><strong>Celular:&ensp;</strong><span>{props.user?.cellphone}</span></div>
                    <div><strong>Presentes:&ensp;</strong><FiEdit onClick={() => allowEdit()} />
                    </div>{edit ? <LabeledInput 
                        label=''
                        type='text'
                        value={giftList}
                        onChange={({ currentTarget }) => setGiftList(currentTarget.value)}
                    /> :
                    <div style={{ paddingLeft: '1.2rem' }}>
                        {props.user?.giftList || <span>Sem sugestões</span>}
                    </div>}
                    <div>
                    {edit &&
                    <>
                        <button className='edit-button' style={{ background: '#0c0' }} onClick={() => {props.edit(giftList); setEdit(false)}}>Salvar</button>
                        <button className='edit-button' style={{ background: '#f00' }} onClick={() => {setGiftList(''); setEdit(false)}}>Cancelar</button>
                    </>}</div>
                </div>
                <div className='middle-line' />
                <div className='info-content'>
                    <div><strong>Amigo Secreto:&ensp;</strong><span>{hiddenFriend?.name || 'Sorteio ainda não realizado'}</span></div>
                    <div><strong>Sugestões de Presentes:&ensp;</strong></div>
                    <div style={{ paddingLeft: '1.2rem' }}>
                        {hiddenFriend?.giftList || (props.user?.hiddenFriend !== "" ? <span>Sem Sugestões</span> : <span>Sorteio ainda não realizado</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}