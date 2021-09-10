import React, { useState } from 'react';
import {
    Accordion,
    Card,
    Form,
    InputGroup,
    Col,
    Row,
    Button,
} from 'react-bootstrap';

const FormUploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <blockquote class="blockquote text-center">
            <div className="login-area">
                <div className="login-main-area">
                        <h2>SONAR 32</h2>
                        <p>Adjuntar Opinion de Cumplimiento</p>
                   
                    <div col-md-3>
                        <form>
                            <input type="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <Button className="btn btn primary" type="submit" >Enviar</Button>

                        </form>

                    </div>
                </div>

            </div>
        </blockquote>

    )

};

export default FormUploadFile;

