import { Jumbotron, Button, Container, Form, Modal, Card } from 'react-bootstrap';
import consultaServicos from '../../../servicos/consultaServicos';
import ConsultaServico from '../../../servicos/consultaServicos';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import Robot from "../../../assets/img/robot.png";
import Rodape from '../../../componentes/rodape';
import Menu from '../../../componentes/menu';
import { useState, useEffect } from 'react';
import StarsRating from 'react-star-ratings';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as Yup from 'yup';
import React from 'react';
import './index.css';

const AdminConsultas = () => {
    const [showReviewed, setShowReviewed] = useState(false);
    const [description, setDescription] = useState("")
    const [consultas, setConsultas] = useState([]);
    const [show, setShow] = useState(false);
    const [stars, setStars] = useState(0)
    const { addToast } = useToasts();

    const handleClose = () => {
        formik.resetForm();
        setShow(false)
    }

    console.log(consultas)

    const handleShow = () => setShow(true);

    useEffect(() => {
        listarConsultas();
    }, []);

    const handleShowReviewed = () => setShowReviewed(true);

    const handleCloseReviewed = () => {
        formik.resetForm();
        setShowReviewed(false)
    }

    const listarConsultas = () => {
        ConsultaServico
            .listar()
            .then(result => {
                setConsultas(result.data.date)
            })
    }

    const setarReview = (item) => {
        setDescription(item.reviews[0].description)
        setStars(item.reviews[0].stars)
    }

    const formik = useFormik({
        initialValues: {
            idAppointment: "",
            description: "",
            stars: "",
        }
    })

    const getInfo = (item) => {
        formik.setValues({
            idAppointment: item.id
        })
        setShow(true)
    }

    const finalizarConsulta = item => {
        const dados = {
            id: item.id,
            status: !item.status
        }

        consultaServicos
            .alterarStatus(dados)
            .then(resultado => {
                if (resultado.data.success) {
                    addToast(resultado.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    listarConsultas();
                } else {
                    addToast(resultado.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
            })
    }

    const renderConsultaMarcada = () => {
        if (consultas.filter(item => item.status === false).length == 0)
            return (
                <div className="marcadaAdmin" style={{ textTransform: "none", paddingTop: "2.5em" }}>
                    <p>Ainda não há <br></br> uma consulta marcada.</p>
                </div>
            )
        else {
            return null;
        }
    }

    const renderConsultaFinalizada = () => {
        if (consultas.filter(item => item.status === true).length == 0)
            return (
                <div className="finalizadasAdmin" style={{ textTransform: "none", paddingTop: "0" }}>
                    <p>Não há consultas finalizadas.</p>
                </div>
            )
        else {
            return null;
        }
    }

    return (
        <div className="fundoBranco">
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width: "100%" }}>Todas as consultas</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/chatbot" style={{ position: "relative", top: "80px" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>
            <Container>
                <div className="consultas">
                    <div className="consultaAdmin">
                        <h2>Marcada</h2>
                        {renderConsultaMarcada()}
                        {
                            consultas.filter(item => item.status === false).map((item) => {
                                var data = moment.parseZone(item.date).format('llll')
                                return (
                                    <div className="marcadaAdmin" key={item.id}>
                                        <div>
                                            <p>{data}</p>
                                            <p>{item.laboratory.adress}</p>
                                            <p>{item.user.name}</p>
                                        </div>
                                        <Button value={item.id} onClick={() => { finalizarConsulta(item) }}>FINALIZAR</Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="consulta2Admin">
                        <h2>Finalizadas</h2>
                        {renderConsultaFinalizada()}
                        {
                            consultas.filter(item => item.status === true).map((item) => {
                                var data = moment.parseZone(item.date).format('llll');
                                if (item.reviews.length == 1) {
                                    return (
                                        <div key={item.id}>
                                            <div className="finalizadasAdmin">
                                                <p>{data}</p>
                                                <p>{item.laboratory.adress}</p>
                                                <p>{item.user.name}</p>
                                                <Button onClick={() => { setarReview(item); handleShowReviewed(showReviewed); }}>VER AVALIAÇÃO</Button>
                                            </div>
                                            <Modal show={showReviewed} onHide={handleCloseReviewed}>
                                                <Modal.Header>
                                                    <Modal.Title>Avaliação de {item.user.name}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="modalText">
                                                        <p>Estrelas </p><StarsRating
                                                            name='stars'
                                                            numberOfStars={5}
                                                            className="stars-ratings"
                                                            starRatedColor="#139548"
                                                            starDimension="24px"
                                                            starSpacing="1px"
                                                            starHoverColor="#139548"
                                                            rating={stars}
                                                        />
                                                    </div>
                                                    <p>Descrição:</p>
                                                    <p>{description}</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseReviewed}>Fechar</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={item.id}>
                                            <div className="finalizadasAdmin">
                                                <p>{data}</p>
                                                <p>{item.laboratory.adress}</p>
                                                <p>{item.user.name}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </Container>
            <Rodape />
        </div>
    )
}

export default AdminConsultas;