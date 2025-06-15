import React from 'react';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';
import { Container } from 'react-bootstrap';

 const NotFound = () => {
    return (
        <div>
            <Menu />
                <Container className='form-height'>
                    <h1 style={{ textAlign: 'center' }}>404</h1>
                </Container>
                <div style={{ marginTop : '100px'}}></div>
            <Rodape />
        </div>
    )

}

export default NotFound;