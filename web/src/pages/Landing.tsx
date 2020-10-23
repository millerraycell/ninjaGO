import React from 'react';
import { Link } from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi'

import '../styles/pages/landing.css'

function Landing(){
    return(
        <div id="landing-page">
            <div className="content-wrapper">
                
                <main>
                    <strong>Bem Vindo</strong>
                    <h1>Os melhores ninjas estão aqui!</h1>
                </main>

                <Link to="/ninjas" className="enter-app">
                    Encontre os ninjas mais proximos de você<FiArrowRight size={26} color = 'rgba(0,0,0,0.6)'/>
                </Link>

            </div>
        </div>
    );
};

export default Landing