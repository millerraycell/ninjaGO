import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ReactToolTip from 'react-tooltip'
import {FiPlus, FiArrowRight, FiArrowLeft, FiRefreshCcw, FiTrash2} from 'react-icons/fi'
import { Map, TileLayer , Marker, Popup} from 'react-leaflet'
import Leaflet from 'leaflet';

import '../styles/pages/ninja-map.css'
import 'leaflet/dist/leaflet.css'

import mapMarker from '../images/map-marker.svg'
import map_pin from '../images/map-pin.svg'
import ninja from '../images/ninja.svg'
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarker,
    iconAnchor: [29, 68],
    iconSize:[58, 68],

    popupAnchor: [170, 2]
})

const user_location = Leaflet.icon({
    iconUrl: map_pin,
    iconAnchor: [29, 68],
    iconSize:[58, 68],

    popupAnchor: [170, 2]
})

interface Ninja{
    _id: string,
    name : string,
    available : boolean,
    rank : string,
    latitude: number,
    longitude: number
};

function NinjaMap(){
    const [ninja_api, setNinja] = useState<Ninja[]>([])
    const [currentPos, setCurrentPos] = useState<[number, number]>([
        0,0
    ])

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) =>{
            setCurrentPos([position.coords.latitude, position.coords.longitude])
        })
    },[])


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            api.get(`ninjas?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
                .then(response => {
                    setNinja(response.data)
                })
        })    
    },[])
    
    return(
        <div id="page-map">
            <aside>
                <Link to="/" className="enter-app">
                    <FiArrowLeft size={26} color = 'rgba(0,0,0,0.6)'/>
                </Link>
                <img src={ninja} alt="Ninja"/>
                <header>
                    <h2>Ninjas próximos</h2>
                </header>
                
                <div className="ninjas-info">
                    
                    <ReactToolTip id="registerNinja" place="top" effect="solid">
                        Cadastrar ninja
                    </ReactToolTip>

                    <ReactToolTip id="updateNinja" place="top" effect="solid">
                        Atualizar cadastro do ninja
                    </ReactToolTip>

                    <ReactToolTip id="removeNinja" place="top" effect="solid">
                        Remover ninja
                    </ReactToolTip>

                    <Link to="/create_ninjas" className="create_ninjas" data-tip data-for="registerNinja">
                        <FiPlus size = {26} color= 'rgb(0,0,0,0.6)'/>
                    </Link>

                    <Link to="/update_ninjas" className="update_ninjas" data-tip data-for="updateNinja">
                        <FiRefreshCcw size = {26} color= 'rgb(0,0,0,0.6)'/>
                    </Link>
                    <Link to="/remove_ninjas" className="remove_ninjas" data-tip data-for="removeNinja">
                        <FiTrash2 size = {26} color= 'rgb(0,0,0,0.6)'/>
                    </Link>
                </div>
                
                <footer>
                    <strong>Boa Vista</strong>
                    <span>Roraima</span>
                </footer>
            </aside>

            <Map
                center={currentPos}
                zoom = {15}
                style = {{ width:'100%', height:'100%'}}>

                <TileLayer 
                url= {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                <Marker
                    position={currentPos}
                    icon = {user_location}
                >
                </Marker>

                {ninja_api.map(ninja =>{
                    if(ninja.available){
                        return(
                            <Marker
                            key = {ninja._id}
                            position={[ninja.latitude,ninja.longitude]}
                            icon = {mapIcon}
                            >
                                <Popup closeButton= {false} minWidth={240} maxWidth={240} className="map-popup">
                                    {ninja.name}
                                    <Link to="">
                                        <FiArrowRight size={20} color="#FFF"></FiArrowRight>
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    }
                    else{
                        return null
                    }
                    }
                )}       
            </Map>
        </div>
        
    );
};

export default NinjaMap