import React, { FormEvent, useState } from 'react'

import imgNinja from '../images/ninja.svg'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/create-ninja.css'
import api from '../services/api';

function CreateNinja(){
    const history = useHistory();

    const [name, setName] = useState("");
    const [rank, setRank] = useState("");
    const [available, setAvailable] = useState("true");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        const data = new FormData();

        const form = {
            name,
            rank,
            available : (available === "true" ? true : false),
            latitude,
            longitude
        }
        
        data.append('',JSON.stringify(form))
        
        await api.post("/ninjas", form);
        
        alert("Cadastrando Ninja");
        
        history.push('\ninjas')
    }

    return(
        <div id="create-ninja">
            <header>
                <Link to= {'/ninjas'} className="go-back">
                    <FiArrowLeft size = {26} color="#000"></FiArrowLeft>
                </Link>
                <img src={imgNinja} alt="ninja"/>
                <h1>Criar Ninja</h1>
            </header>

            <form onSubmit={handleSubmit} className="create-ninja-form">
                <fieldset>
                    <div className="dados-ninja">
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value = {name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="rank">Rank</label>
                            <input id="rank" value = {rank} onChange={(e) => setRank(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="available">Disponivel</label>

                            <div className="button-select">
                                <select value={available} onChange={(e) => setAvailable(e.target.value)}>
                                    <option value = "true">Sim</option>
                                    <option value = "false">Não</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" value = {latitude} onChange={(e) => setLatitude(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" value = {longitude} onChange={(e) => setLongitude(e.target.value)}/>
                        </div>
                    </div>
                </fieldset>

                <div className="button-send">
                    <button className="confirm-button" type="submit">
                        Enviar
                    </button>         
                </div>
            </form>
        </div>
    );
};

export default CreateNinja;