import React, { useEffect, useState } from 'react'
import { FormEvent } from 'react';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import imgNinja from '../images/ninja.svg'
import api from '../services/api';
import '../styles/pages/remove-ninja.css'

interface Ninja{
    _id: string,
    name : string,
    available : boolean,
    rank : string,
    geometry: {
        type: string,
        coordinates: [number, number]
    }
};

function RemoveNinja(){
    const history = useHistory();
    
    const [ninjas, setNinja] = useState<Ninja[]>([]);
    
    useEffect(()=>{
        api.get("/ninjas-list")
        .then(({data})=>{
            setNinja(data);
        })
    },[])
    
    const handleSubmit = async (e : FormEvent, id_handle:string) => {
        e.preventDefault();

        console.log(id_handle)

        await api.delete(`/ninjas/${id_handle}`)
        alert(`Ninja id: ${id_handle}`)

        history.push('/ninjas')
              
    }
    
    return(
        <div id="remove-ninja">
            <header>
                <Link to= {'/ninjas'} className="go-back">
                    <FiArrowLeft size = {26} color="#000"></FiArrowLeft>
                </Link>
                <img src={imgNinja} alt="ninja"/>
                <h1>Remover Ninja</h1>
            </header>
            <form className="remove-ninja-form">
                <h1 className="texto">Escolha um ninja para remover</h1>
                <div className="ninjas-list" >
                    <ul className="list">
                        {ninjas.map(ninja => {                            
                            return(
                                <li key={ninja._id} >
                                    <div className="dados">
                                        <h1>{ninja.name}</h1>
                                        <h1>{ninja.rank}</h1>
                                        <h1>{ninja.geometry.coordinates[0]}</h1>
                                        <h1>{ninja.geometry.coordinates[1]}</h1>
                                          
                                        <button onClick={(e) => handleSubmit(e, ninja._id)}>
                                            <FiTrash2 size={26}></FiTrash2>
                                        </button>             
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default RemoveNinja;