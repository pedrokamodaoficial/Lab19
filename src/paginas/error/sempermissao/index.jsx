import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';

const SemPermissao = () => {
    return (
        <div>
            <Menu />
                <Container>
                    <h1 style={{ textAlign: 'center' }}> Você não tem permissão de acessar está página.</h1>
                </Container>
                <div style={{ marginTop : '100px'}}></div>
            <Rodape />
        </div>
    )

}

export default SemPermissao;