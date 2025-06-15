import { Container, Form, Button, Jumbotron, Popover, OverlayTrigger, Overlay } from 'react-bootstrap';
import ConsultaServico from '../../../servicos/consultaServicos';
import { useToasts } from 'react-toast-notifications';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState, useEffect, useRef } from 'react';
import Rodape from '../../../componentes/rodape';
import User from '../../../assets/img/user.png';
import { useHistory } from 'react-router-dom';
import Menu from '../../../componentes/menu';
import Collapsible from 'react-collapsible';
import conta from '../../../servicos/conta';
import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as Yup from 'yup';
import React from 'react';
import './index.css';

const Perfil = (props) => {
    const [consultas, setConsultas] = useState([]);
    const token = localStorage.getItem('token');
    const [user, setUser] = useState("");
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        listarConsultas();
        listarUser()
    }, []);

    const listarUser = () => {
        conta
            .buscarId(jwtDecode(token).jti)
            .then(response => {
                setUser(response.data.date)
            })
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            email: '',
            location: '',
            birthDate: '',
            password: ''
        },
        onSubmit: values => {
            alterar(values);
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, 'O nome deve ter no minimo 3 caracteres')
                .max(100, 'O nome deve ter no máximo 100 caracteres')
                .required('É obrigatorio preencher este campo.'),
            email: Yup.string()
                .required('É obrigatorio preencher este campo.'),
            location: Yup.string()
                .required('É obrigatorio preencher este campo.'),
            birthDate: Yup.string()
                .required('É obrigatorio preencher este campo.')
        })
    })

    const formikSenha = useFormik({
        initialValues: {
            id: '',
            password: ''
        },
        onSubmit: values => {
            alterarSenha(values);
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required('É obrigatorio preencher este campo.')
        })
    })

    const alterar = (values) => {
        conta
            .alterarDados(values)
            .then(resultado => {
                if (resultado.data.success) {
                    addToast(resultado.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    listarUser()
                } else {
                    addToast(resultado.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
                formik.setSubmitting(false);
            })
    }

    const alterarSenha = (values) => {
        conta
            .alterarSenha(values)
            .then(resultado => {
                console.log(resultado)
                if (resultado.data.success) {
                    addToast(resultado.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    listarUser()
                } else {
                    addToast(resultado.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
                formik.setSubmitting(false);
            })
    }

    const listarConsultas = () => {
        ConsultaServico
            .listar()
            .then(result => {
                setConsultas(result.data.date)
            })
            .catch(err => console.error(err))
    }

    const renderConsultaMarcada = () => {
        if (consultas.filter(item => item.status === false && jwtDecode(token).jti.toString() === item.user.id).length == 0)
            return (
                <>
                    <h2 style={{ textTransform: "none" }}> Você não tem uma < br ></br > consulta marcada.</h2>
                    <div className="marcadaPerfil" style={{ textTransform: "none", paddingTop: "0" }}>
                        <p>Ainda não há <br></br> uma consulta marcada.</p>
                    </div>
                </>
            )
        else {
            return (
                <h2 style={{ textTransform: "none" }}>Você tem uma<br></br>consulta marcada:</h2>
            )
        }
    }

    const PopoverSalvar = () => {
        const [show, setShow] = useState(false);
        const target = useRef(null);

        return (
            <>
                <Button bsPrefix="btnOpenPopover" variant="danger" ref={target} onClick={() => setShow(!show)}>Salvar</Button>
                <Overlay target={target.current} show={show} placement="bottom" rootClose={true}>
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                                marginTop: "10px",
                                border: '1px solid #a6a6a6',
                                backgroundColor: 'white',
                                borderRadius: 3,
                                color: 'black',
                                ...props.style,
                            }}
                        >
                            <Popover.Title as="h3">Deseja salvar as alterações?</Popover.Title>
                            <Popover.Content bsPrefix="popoverContent">
                                <Button className="btnPopover" onClick={formik.handleSubmit} type="button" disabled={formik.isSubmitting}>Sim</Button>
                                <Button className="btnPopoverGreen" onClick={() => setShow(false)} type="button" disabled={formik.isSubmitting}>Não</Button>
                            </Popover.Content>
                        </div>
                    )}
                </Overlay>
            </>
        );
    }

    const PopoverSalvarSenha = () => {
        const [show, setShow] = useState(false);
        const target = useRef(null);

        return (
            <>
                <Button bsPrefix="btnOpenPopover" variant="danger" ref={target} onClick={() => setShow(!show)}>Salvar</Button>
                <Overlay target={target.current} show={show} placement="bottom" rootClose={true}>
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                                marginTop: "10px",
                                border: '1px solid #a6a6a6',
                                backgroundColor: 'white',
                                borderRadius: 3,
                                color: 'black',
                                ...props.style,
                            }}
                        >
                            <Popover.Title as="h3">Deseja salvar a nova senha?</Popover.Title>
                            <Popover.Content bsPrefix="popoverContent">
                                <Button className="btnPopover" onClick={formikSenha.handleSubmit} type="button" disabled={formik.isSubmitting}>Sim</Button>
                                <Button className="btnPopoverGreen" onClick={() => setShow(false)} type="button" disabled={formik.isSubmitting}>Não</Button>
                            </Popover.Content>
                        </div>
                    )}
                </Overlay>
            </>
        );
    }

    return (
        <div className="fundoBranco">
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ display: 'flex' }}>
                            <h1 style={{}}><a href="/perfil"><img src={User} alt='Logo' style={{ width: '130px', marginTop: "15px" }} /></a></h1>
                            <h1 style={{ zIndex: '99', marginTop: '45px', paddingLeft: '30px', textTransform: "capitalize" }}> Olá, {user.name}.</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <div style={{ marginTop: '120px' }}></div>
            </div>
            <Container style={{ marginTop: "100px" }}>
                <div className="perfilContainer">
                    <div className="column">
                        <div className="perfilConsultas">
                            <div className="perfilConsulta">
                                {renderConsultaMarcada()}
                                {
                                    consultas.filter(item => item.status === false && jwtDecode(token).jti.toString() === item.user.id).map((item, index) => {
                                        var data = moment.parseZone(item.date).format('llll')
                                        return (
                                            <div className="marcadaPerfil" key={item.id}>
                                                <p>{data}</p>
                                                <p>{item.laboratory.adress}</p>
                                            </div>
                                        )
                                    })
                                }
                                <a href="/consultas">
                                    <button className="consultasFinalizadas">Consultas Finalizadas</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="column">

                        <Collapsible
                            easing="ease"
                            transitionTime="500"
                            className="dadosClosed"
                            openedClassName="dados"
                            triggerClassName="cardTitleDados"
                            triggerOpenedClassName="cardTitleDados"
                            trigger={["Meus Dados", <RiArrowDropDownLine />]}
                            onTriggerOpening={() => formik.setValues({
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                location: user.location,
                                birthDate: moment(user.birthDate).format('YYYY-MM-DD')
                            })
                            }
                            onClose={formik.resetForm}
                        >
                            <Form>
                                <input type="hidden" value={formik.id} name="id" />
                                <Form.Group controlId="formBasic">
                                    <Form.Label className="formLabel">Nome</Form.Label>
                                    <Form.Control className="formInput" type="text" name="name" maxLength="100" onChange={formik.handleChange} value={formik.values.name} required />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="formLabel">Email</Form.Label>
                                    <Form.Control type="email" name="email" className="formInput" onChange={formik.handleChange} value={formik.values.email} required />
                                </Form.Group>

                                <Form.Group controlId="formBasicLocation">
                                    <Form.Label className="formLabel">Localização</Form.Label>
                                    <Form.Control type="text" name="location" className="formInput" onChange={formik.handleChange} value={formik.values.location} />
                                </Form.Group>

                                <Form.Group className="formGroup" controlId="formBasicDate">
                                    <Form.Label className="formLabel">Data de Nascimento (mês/dia/ano)</Form.Label>
                                    <Form.Control type="date" data-date="" data-date-format="DD MMMM YYYY" name="birthDate" className="formInput" onChange={formik.handleChange} value={moment(formik.values.birthDate).format('YYYY-MM-DD')} />
                                </Form.Group>
                                <div className="editardados">
                                    <PopoverSalvar />
                                </div>
                            </Form>
                        </Collapsible>
                        <Collapsible
                            easing="ease"
                            transitionTime="500"
                            className="dadosClosed"
                            openedClassName="dados"
                            triggerClassName="cardTitleDados"
                            triggerOpenedClassName="cardTitleDados"
                            trigger={["Alterar Senha", <RiArrowDropDownLine />]}
                            onTriggerOpening={() => formikSenha.setValues({
                                id: user.id
                            })
                            }
                            onClose={formikSenha.resetForm}
                        >
                            <Form>
                                <input type="hidden" value={formikSenha.id} name="id" />
                                <Form.Group style={{ marginTop: "10px", zIndex: "99" }} controlId="formBasicPassword">
                                    <Form.Label style={{ marginTop: "0" }} className="formLabel">Senha</Form.Label>
                                    <Form.Control className="formInput" type="password" name="password" maxLength="100" onChange={formikSenha.handleChange} value={formikSenha.values.password} required />
                                </Form.Group>
                                <div className="editardados">
                                    <PopoverSalvarSenha />
                                </div>
                            </Form>
                        </Collapsible>
                    </div>
                </div>
            </Container>
            <div style={{ marginTop: '50px' }}></div>
            <Rodape />
        </div>
    )
}

export default Perfil;