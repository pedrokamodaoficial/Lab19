import { Carousel, Jumbotron, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Triagem from '../../assets/img/triagem.png';
import Rodape from '../../componentes/rodape';
import Menu from '../../componentes/menu';
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './index.css';
import Logo from '../../assets/img/logo.png';
import Robot from "../../assets/img/robot.png";
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://covid-19-tracking.p.rapidapi.com/v1',
            headers: {
                'x-rapidapi-key': '1938376461msh36b9f7f4d6e7e53p1426cfjsn159900142d08',
                'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
                "useQueryString": true
            }
        };

        axios.request(options).then(function (response) {
            setMortes(response.data[3]['Total Deaths_text'])
            setCasos(response.data[3]['Total Cases_text'])
            setNovosCasos(response.data[3]['Active Cases_text'])
            setRecup(response.data[3]['Total Recovered_text'])
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const [mortes, setMortes] = useState('')
    const [casos, setCasos] = useState('')
    const [novosCasos, setNovosCasos] = useState('')
    const [recup, setRecup] = useState('')
    const mapRef = useRef();
    useEffect(() => {
        new window.google.maps.Map(mapRef.current, {
            center: { lat: -23.536303, lng: -46.646248 },
            zoom: 16,
        });
    }, []);

    return (
        <div className="fundoBranco">
            <Menu />
            <div className="imgBanner">
                <a href="/" style={{ height: "75.31px", position: "relative", top: "-50px", marginLeft: "5%" }}><img src={Logo} alt='Logo' style={{ height: "75px" }} /></a>
                <a href="/FAQ"  style={{ position: "relative", top: "80px", marginRight: "5%" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>
            <Container>
                <div style={{ textAlign: "center" }}>
                    <img src={Triagem} alt='Triagem'
                        style={{
                            width: '500px',
                            height: 'auto'
                        }} />
                    <p>*Em casos de persistência dos sistomas, é necessario o diagnóstico do médico</p>
                </div>
                <p style={{ marginTop: '50px', fontWeight: 'bold', textAlign: 'center' }}>Dados sobre o COVID-19 no Brasil</p>

                <div className="informacoesCovid">
                    <div className="infoCovid">
                        <div className="numCovid">
                            <p>{casos}</p>
                        </div>
                        <h6>Total de Casos</h6>
                    </div>
                    <div className="infoCovid">
                        <div className="numCovid">
                            <p>{mortes}</p>
                        </div>
                        <h6>Total de Mortes</h6>
                    </div>
                    <div className="infoCovid">
                        <div className="numCovid">
                            <p>{recup}</p>
                        </div>
                        <h6>Total de Recuperados</h6>
                    </div>
                    <div className="infoCovid">
                        <div className="numCovid">
                            <p>{novosCasos}N/A</p>
                        </div>
                        <h6>Novos Casos</h6>
                    </div>
                </div>
            </Container>

            <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "3em", marginBottom: "3em" }}>
                <Button variant="primary" style={{ width: '200px', height: '50px', fontSize: '20px' }} onClick={() => (history.push("/FAQ"))}>Acesse o FAQ</Button>
            </Container>

            <div style={{ backgroundColor: "#e6e6e6", display: "Flex", justifyContent: "center", alignItems: "center" }}>
                <div className="info">
                    <Card className="cardinfo">
                        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/819577164411699330/844260053434761216/unknown.png" />
                        <Card.Body>
                            <Card.Text>
                                <strong>
                                    Você pode ser infectado ao inalar o vírus se estiver próximo de alguém que tenha COVID-19 ou ao tocar em uma superfície contaminada e, em seguida, passar as mãos nos olhos, no nariz ou na boca.
                                </strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="cardinfo">
                        <Card.Img style= {{ width: '60%', height: 'auto', margin: 'auto' }} variant="top" src="https://cdn.discordapp.com/attachments/819577164411699330/856700309141323796/pngegg_1.png"/>
                        <Card.Body>
                            <Card.Text>
                                <strong>
                                    Você pode verificar seus sintomas e receber seu diagnóstico e marcar uma consulta sem sair de casa a fim de evitar os riscos, apenas com poucos cliques.
                                </strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="cardinfo">
                        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/819577164411699330/856698834619858944/pngegg.png"/>
                        <Card.Body>
                            <Card.Text>
                                <strong>
                                    Os dados inseridos em nossa plataforma, estão totalmente seguros.
                                    A partir deles, podemos identificar o usuário e o visitante, 
                                    além de garantir uma maior segurança e bem-estar às suas necessidades. 
                                </strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div style={{ backgroundColor: '#C4C4C4' }}>
                <Container className="about">
                    <div ref={mapRef} style={{ width: 700, height: 450, border: "3px solid #a3a3a3", borderRadius: "10px" }}></div>
                    <div className="text">
                        <h4>Um pouco sobre nós</h4>
                        <p>
                            O Lab19 foi um projeto desenvolvido
                            a fim de diminuir a superlotação
                            nas clínicas e hospitais em função
                            ao COVID-19.
                        </p>
                    </div>
                </Container>
            </div>
            <Rodape />
        </div>
    )

}

export default Home;