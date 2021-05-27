import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => (
    <>
    <div className="text-center">
        <h1>404 - Not Found!</h1>
        <br />
        <Link to="/">Home</Link>
    </div>
    </>
);

export default NotFound;