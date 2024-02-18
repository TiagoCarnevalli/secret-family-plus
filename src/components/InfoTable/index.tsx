import React, { useEffect, useState } from 'react'
import './styles.scss'
import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { dbFirestore } from '../../api/firebase';
import LabeledInput from '../LabeledInput';

export default function InfoTable() {
    const [list, setList] = useState<DocumentData[]>();
    const [search, setSearch] = useState('');

    async function getList() {
        const { docs } = await getDocs(query(collection(dbFirestore, 'participantes')));
        setList(docs?.map((item) => { return item.data() }));
    }

    useEffect(() => {
        getList();
    }, [])

    return <div>
        <div className='table-container'>
            <table className='gifts-table'>
                <thead>
                    <tr>
                        <th style={{ minWidth: '14rem' }}>Nome</th>
                        <th>Presentes</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.sort((a, b) => { return a.name > b.name ? 1 : -1 }).filter((item) => { return item.name.toLowerCase().includes(search.toLocaleLowerCase()) }).map((item, index) => {
                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.giftList}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        <div className='search-input'>
            <LabeledInput label={'Pesquisar por nome'} value={search} type={'text'} onChange={(e) => setSearch(e.currentTarget.value)} />
        </div>
    </div>
}