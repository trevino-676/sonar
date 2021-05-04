import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout'; 
import Home from '../pages/Home';


const App = () => (
        <BrowserRouter>
            <Layout>
                <Switch>
                    {/* Aqui van las rutas de la aplicacion */}
                    <Route exact path="/" component={Home} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )

export default App;