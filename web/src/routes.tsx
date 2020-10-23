import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CreateNinja from './pages/CreateNinja';
import Landing from './pages/Landing';
import NinjaMap from './pages/NinjaMap';
import RemoveNinja from './pages/RemoveNinja';
import UpdateNinja from './pages/UpdateNinja';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing}/>
                <Route path='/ninjas' component={NinjaMap}/>
                <Route path='/create_ninjas' component={CreateNinja}/>
                <Route path='/update_ninjas' component={UpdateNinja}/>
                <Route path='/remove_ninjas' component={RemoveNinja}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;