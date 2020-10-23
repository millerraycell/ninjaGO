import React, { FormEvent, useEffect, useState } from 'react'
import { FiArrowLeft, FiRefreshCcw } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import imgNinja from '../images/ninja.svg'
import api from '../services/api';
import '../styles/pages/update-ninja.css'

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

function UpdateNinja(){
    const history = useHistory();

    const [id_update, setId_update] = useState("")

    const [name, setName] = useState("");
    const [rank, setRank] = useState("");
    const [available, setAvailable] = useState("true");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [ninjas, setNinja] = useState<Ninja[]>([]);
    
    useEffect(()=>{
        api.get("/ninjas-list")
        .then(({data})=>{
            setNinja(data);
        })
    },[])

    const handleUpdate = (e : FormEvent, id_handle:string) => {
        e.preventDefault();

        let ninja_handle = ninjas.filter((ninja) => {
            return ninja._id === id_handle
        })

        setId_update(id_handle)

        setName(ninja_handle[0].name);
        setRank(ninja_handle[0].rank);
        setAvailable(ninja_handle[0].available===true ? "true" : "false");
        setLatitude(ninja_handle[0].geometry.coordinates[0].toString());
        setLongitude(ninja_handle[0].geometry.coordinates[1].toString());
    }

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        setName(name);
        setRank(rank);
        setAvailable(available);
        setLatitude(latitude);
        setLongitude(longitude);

        const data = new FormData();

        const form = {
            name,
            rank,
            available : (available === "true" ? true : false),
            latitude,
            longitude
        }

        data.append('',JSON.stringify(form))

        await api.put(`/ninjas/${id_update}`,form)


        alert(`Update ninja ${name}`)

        history.push('/ninjas')
    }
    
    return(
        <div id="update-ninja">
            <header>
                <Link to= {'/ninjas'} className="go-back">
                    <FiArrowLeft size = {26} color="#000"></FiArrowLeft>
                </Link>
                <img src={imgNinja} alt="ninja"/>
                <h1>Atualizar dados do Ninja</h1>
            </header>

            <form onSubmit={handleSubmit} className="update-ninja-form">
                <h1>Ninjas cadastrados:</h1>
                <br/>
                <div className="ninjas-list" >
                    <ul className="list">
                        {ninjas.map(ninja => {                            
                            return(
                                <li key={ninja._id} >
                                    <div className="dados">
                                        <h1>NOME: {ninja.name}</h1>
                                        <h1>RANK: {ninja.rank}</h1>
                                        <h1>LATITUDE: {ninja.geometry.coordinates[0]}</h1>
                                        <h1>LONGITUDE: {ninja.geometry.coordinates[1]}</h1>
                    
                                        <button onClick={(e) => handleUpdate(e, ninja._id)}>
                                            <FiRefreshCcw size={26}></FiRefreshCcw>
                                        </button> 
                                        <br/>
                                        <br/>              
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <fieldset>
                    <h1>Dados do ninja:</h1>
                    <br/>
                    <div className="dados-ninja">
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" placeholder={name} value = {name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="rank">Rank</label>
                            <input id="rank" placeholder={rank} value = {rank} onChange={(e) => setRank(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="available">Disponivel</label>

                            <div className="button-select">
                                <select placeholder={available} value={available} onChange={(e) => setAvailable(e.target.value)}>
                                    <option value = "true">Sim</option>
                                    <option value = "false">Não</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" placeholder={latitude} value = {latitude} onChange={(e) => setLatitude(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" placeholder={longitude} value = {longitude} onChange={(e) => setLongitude(e.target.value)}/>
                        </div>
                    </div>
                </fieldset>

                <div className="button-send">
                    <button className="confirm-button" type="submit">
                        Atualizar dados do ninja
                    </button>         
                </div>
            </form>
        </div>
    );
};

export default UpdateNinja;