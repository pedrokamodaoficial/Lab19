import { Jumbotron, Container, Modal, Form, Button } from 'react-bootstrap';
import consultaServicos from '../../servicos/consultaServicos';
import ConsultaServico from '../../servicos/consultaServicos';
import { useToasts } from 'react-toast-notifications';
import Robot from "../../assets/img/robot.png";
import Rodape from '../../componentes/rodape';
import { useState, useEffect } from 'react';
import Menu from '../../componentes/menu';
import StarsRating from 'react-star-ratings';
import jwtDecode from 'jwt-decode';
import { useFormik } from 'formik';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as Yup from 'yup';
import React from 'react';
import './index.css';

const Consultas = () => {
    const [showReviewed, setShowReviewed] = useState(false);
    const [description, setDescription] = useState("")
    const [consultas, setConsultas] = useState([]);
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [stars, setStars] = useState(0)
    const { addToast } = useToasts();

    useEffect(() => {
        listarConsultas();
    }, []);

    const formik = useFormik({
        initialValues: {
            idAppointment: "",
            description: "",
            stars: 0
        },
        onSubmit: values => {
            avaliar(values)
        },
        validationSchema: Yup.object().shape({
            stars: Yup.string()
                .required("Por favor selecione uma quantidade de estrelas."),
            description: Yup.string()
                .required("Insira uma descrição.")
        })
    })

    const handleShow = () => setShow(true);

    const handleShow1 = () => setShow1(true);

    const handleClose = () => {
        formik.resetForm();
        setShow(false)
    }

    const handleClose1 = () => {
        setShow1(false)
    }

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

    const renderConsultaMarcada = () => {
        if (consultas.filter(item => item.status === false && jwtDecode(token).jti.toString() === item.user.id).length == 0)
            return (
                <div className="marcada" style={{ textTransform: "none", paddingTop: "0" }}>
                    <p>Ainda não há <br></br> uma consulta marcada.</p>
                </div>
            )
        else {
            return null;
        }
    }

    const renderConsultaFinalizada = () => {
        if (consultas.filter(item => item.status === true && jwtDecode(token).jti.toString() === item.user.id).length == 0)
            return (
                <div className="finalizadas" style={{ textTransform: "none", paddingTop: "0" }}>
                    <p>Não há consultas finalizadas.</p>
                </div>
            )
        else {
            return null;
        }
    }

    const avaliar = (dados) => {
        consultaServicos
            .avaliar(dados)
            .then(resultado => {
                if (resultado.data.success) {
                    addToast('Cadastrado com sucesso', {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    handleClose()
                    listarConsultas()
                } else {
                    addToast(resultado.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
            })
    }

    const getId = (id) => {
        formik.setFieldValue("idAppointment", id)
        setShow(true)
    }

    const changeRating = (newRating) => {
        formik.setFieldValue("stars", newRating)
    }

    const setarReview = (item) => {
        setDescription(item.reviews[0].description)
        setStars(item.reviews[0].stars)
    }

    const renderModal = (item) => {
        var data = moment.parseZone(item.date).format('llll');
        if (item.reviews.length == 1) {
            return (
                <div key={item.id}>
                    <div className="finalizadas">
                        <p>{data}</p>
                        <p>{item.laboratory.adress}</p>
                        <Button onClick={() => { setarReview(item); handleShowReviewed(showReviewed); handleClose(); }}>VER AVALIAÇÃO</Button>
                    </div>
                    <Modal show={showReviewed} onHide={handleCloseReviewed}>
                        <Modal.Header>
                            <Modal.Title>Olá, {item.user.name}, essa foi sua avaliação da consulta!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modalText">
                                <p>Você avaliou essa consulta com</p><StarsRating
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
                    <div className="finalizadas">
                        <p>{data}</p>
                        <p>{item.laboratory.adress}</p>
                        <Button bsPrefix="btn" onClick={() => { getId(item.id); handleShow(show) }}>AVALIAR</Button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Olá, {item.user.name}, faça uma avaliação da consulta!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <input
                                    type="hidden"
                                    id="idAppointment"
                                    name="idAppointment"
                                    value={formik.values.idAppointment}
                                />
                                <Form.Label>Avalie a consulta por estrelas</Form.Label>
                                <StarsRating
                                    name='stars'
                                    numberOfStars={5}
                                    className="stars-ratings"
                                    starRatedColor="#139548"
                                    starHoverColor="#139548"
                                    changeRating={changeRating}
                                    rating={formik.values.stars}
                                />
                                {formik.touched.stars && formik.errors.stars ? (<div className="erro">{formik.errors.stars}</div>) : null}
                                <Form.Group controlId="description">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        rows="3"
                                        type="text"
                                        as="textarea"
                                        name="description"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description} />
                                    {formik.touched.description && formik.errors.description ? (<div className="erro">{formik.errors.description}</div>) : null}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button variant="primary" onClick={formik.handleSubmit}>Avaliar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }

    return (
        <div className="fundoBranco">
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width: "100%" }}>Minhas consultas</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/chatbot" style={{ position: "relative", top: "80px" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>
            <Container>
                <div className="consultas">
                    <div className="consulta">
                        <h2>Marcada</h2>
                        {renderConsultaMarcada()}
                        {
                            consultas.filter(item => item.status === false && jwtDecode(token).jti.toString() === item.user.id).map((item, index) => {
                                var data = moment.parseZone(item.date).format('llll')
                                return (
                                    <div className="marcada" key={index}>
                                        <p>{data}</p>
                                        <p>{item.laboratory.adress}</p>
                                        <Button bsPrefix="btn" onClick={() => { handleShow1(show1); handleClose(false) }}>SINTOMAS</Button>
                                        <Modal show={show1} size="sm" onHide={handleClose1}>
                                            <Modal.Body className='modalSintomas'>
                                                <div className='divSintomas'>
                                                    {item.sintomas.split(',').map((item, index) => {
                                                        return (
                                                            <ul className='listSintomas'>Sintomas comuns
                                                                <li className='listSintoma'>{item}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                    {item.sintomasIntermediarios.split(',').map((item, index) => {
                                                        if (item.length == 0)
                                                            return null
                                                        return (
                                                            <ul className='listSintomas'>Sintomas Intermediarios
                                                                <li className='listSintoma'>{item}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                    {item.sintomasGraves.split(',').map((item, index) => {
                                                        if (item.length == 0)
                                                            return null
                                                        return (
                                                            <ul className='listSintomas'>Sintomas Graves
                                                                <li className='listSintoma'>{item}</li>
                                                            </ul>
                                                        )

                                                    })}
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose1}>Fechar</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="consulta2">
                        <h2>Finalizadas</h2>
                        {renderConsultaFinalizada()}
                        {
                            consultas.filter(item => item.status === true && jwtDecode(token).jti.toString() === item.user.id).map((item) => {
                                return renderModal(item)
                            })
                        }
                    </div>
                </div>
            </Container>
            <Rodape />
        </div >
    )
}

export default Consultas;