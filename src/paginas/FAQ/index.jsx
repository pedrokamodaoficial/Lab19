import { Jumbotron, Container, Col } from 'react-bootstrap';
import Rodape from '../../componentes/rodape';
import Menu from '../../componentes/menu';
import React from 'react';
import Robot from "../../assets/img/robot.png";
import './index.css';

const FAQ = () => {
    return (
        <div style={{ backgroundColor: '#FFFFFF' }}>
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width:"100%"  }}>FAQ</h1>
                            <h2 style={{ fontWeight: 'bold', marginLeft: "10%", width:"100%"  }}>Perguntas Feitas Frequentemente</h2>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/FAQ" style={{ position: "relative", top: "80px", marginRight: "5%" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>

            <Container>
                <Col style={{ marginTop: '100px' }}>
                    <h3 style={{ color: '#FAC710', fontWeight:"900" }}>Devo confiar no diagnóstico?</h3>
                    <h4>Sim, somos aprovados pelas melhores equipes de cientistas do mundo.</h4>
                </Col>
                <Col style={{ marginTop: '100px' }}>
                    <h3 style={{ color: '#FAC710', fontWeight:"900"  }}>Por que esse sistema existe?</h3>
                    <h4>Esse sistema que foi desenvolvido é uma forma de solução para a superlotação dos Laboratórios Y.</h4>
                </Col>
                <Col style={{ marginTop: '100px' }}>
                    <h3 style={{ color: '#FAC710', fontWeight:"900"  }}>O que devo fazer se realmente estiver contaminado?</h3>
                    <h4>Deve se dirigir a um hospital próximo o mais rapido possivel, para fazer exames e se manter 14 dias isolado.</h4>
                </Col>
                <Col style={{ marginTop: '100px' }}>
                    <h3 style={{ color: '#FAC710', fontWeight:"900"  }}>O que é um chatbot?</h3>
                    <h4>Chatbot é a inteligência artificial desenvolvida para a interação com os usuarios..</h4>
                </Col>
                <Col style={{ marginTop: '100px' }}>
                    <h3 style={{ color: '#FAC710', fontWeight:"900"  }}>Meus dados estão seguros?</h3>
                    <h4>Seus dados estão seguros, de acordo com a politica de privacidade, e não serão vendidos ou compartilhados.</h4>
                </Col>
            </Container>
            <div style={{ marginTop: '150px' }}></div>
            <Rodape />
        </div>
    )

}

export default FAQ;