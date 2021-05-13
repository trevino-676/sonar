import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout'; 
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

import RegistroEmpresa from '../pages/RegistroEmpresa';

import Flogin from '../pages/Flogin'; 

import FacebookLogin from 'react-facebook-login';


const App = () => (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {/* Aqui van las rutas de la aplicacion */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/registro" component={Registro} />
                    <Route exact path="/landing" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/Flogin" component={Flogin} /> 
                    <Route exact path="/RegistroEmpresa" component={RegistroEmpresa}/>
                </Switch>
            </Layout> 
        </BrowserRouter>
    )

export default App;