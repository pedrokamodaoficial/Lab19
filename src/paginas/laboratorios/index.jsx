import laboratoriosServicos from '../../servicos/laboratoriosServicos';
import { Jumbotron, Container } from 'react-bootstrap';
import { RiArrowDropDownLine } from "react-icons/ri";
import location from "../../assets/img/location.png"
import Robot from "../../assets/img/robot.png";
import clock from "../../assets/img/clock.png";
import heart from "../../assets/img/heart.png";
import Rodape from '../../componentes/rodape';
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import Menu from '../../componentes/menu';
import React from 'react';
import './index.css';

const Laboratorios = () => {
    const [laboratorios, setLaboratorios] = useState([])
    const [termo, setTermo] = useState('')

    useEffect(() => {
        listarLaboratorios()
    }, [])

    const listarLaboratorios = () => {
        laboratoriosServicos
            .listar()
            .then(response => {
                setLaboratorios(response.data.date)
            })
    }

    return (
        <div className="fundoBranco">
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-50px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000' }}>Laboratorios</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/FAQ"><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain", position: "relative", top: "75px" }} /></a>
            </div>

            <Container style={{ marginTop: '100px' }}>
                <div className="pesquisarLab">
                    <h2>Localizar Unidade</h2>
                    <input type="text" placeholder="Digite aqui nome ou endereço" onChange={event => { setTermo(event.target.value) }} />
                </div>
            </Container>

            <Container>
                <div className="titleLab">
                    <h2>UNIDADES Y</h2>
                    <p>Clique no nome da unidade para ver mais detalhes</p>
                </div>
                {
                    laboratorios.filter((item) => {
                        if (termo == "") {
                            return item
                        } else if (item.name.toLowerCase().includes(termo.toLowerCase())) {
                            return item
                        } else if (item.adress.toLowerCase().includes(termo.toLowerCase()))
                            return item
                    }).map((item) => {
                        return (
                            <>
                                <Collapsible trigger={[item.name, <RiArrowDropDownLine />]} triggerClassName="nomeLab" triggerOpenedClassName="nomeLab" transitionTime="300" easing="linear">
                                    <div className="detalhes">
                                        <div className="detalhesLab">
                                            <img src={clock} alt="" />
                                            <div>
                                                <h4>HORÁRIO DE ATENDIMENTO</h4>
                                                <p>{item.availableTime}</p>
                                            </div>
                                        </div>
                                        <div className="detalhesLab">
                                            <img src={clock} alt="" />
                                            <div>
                                                <h4>HORÁRIO DE VACINAÇÃO</h4>
                                                <p>{item.availableTime}</p>
                                            </div>
                                        </div>
                                        <div className="detalhesLab">
                                            <img src={heart} alt="" />
                                            <div>
                                                <h4>EXAMES RELIZADOS NESTA UNIDADE</h4>
                                                <p>Covid-19</p>
                                            </div>
                                        </div>
                                        <div className="detalhesLab">
                                            <img src={location} alt="" />
                                            <div>
                                                <h4>LOCALIZAÇÃO</h4>
                                                <p>{item.adress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Collapsible>
                            </>
                        )
                    })
                }
            </Container>
            <Rodape />
        </div>
    )

}

export default Laboratorios;