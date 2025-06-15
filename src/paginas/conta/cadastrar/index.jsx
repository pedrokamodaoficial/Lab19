import React from 'react';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';
import { useFormik } from 'formik';
import { Container, Form, Button, Jumbotron } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import conta from '../../../servicos/conta';
import Robot from '../../../assets/img/robot.png';

const Cadastrar = () => {
    const { addToast } = useToasts();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            conta.cadastrar(values)
                .then(resultado => {
                    setSubmitting(false);
                    if (resultado.data.success) {
                        conta.logar(values)
                            .then(resultado => {
                                setSubmitting(false);
                                if (resultado.data.success) {
                                    addToast('Usuario cadastrado com sucesso.', {
                                        appearance: 'success',
                                        autoDismiss: true,
                                    })
                                    localStorage.setItem('token', resultado.data.data.token)
                                    history.push('/');
                                } else {
                                    addToast(resultado.data.message, {
                                        appearance: 'error',
                                        autoDismiss: true,
                                    })
                                }
                            })
                            .catch(error => console.error(error));
                        history.push('/');
                    } else {
                        addToast(resultado.data.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    }
                })
                .catch(error => console.error(error));
        },
    });

    return (
        <div>
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width:"100%"  }}>Cadastro</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/chatbot" style={{ position: "relative", top: "80px", marginRight: "5%" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>
            <Container className='form-height placeholderBranco'>
                <Form onSubmit={formik.handleSubmit} style={{
                    backgroundColor: '#139548',
                    color: 'white',
                    borderRadius: '26px',
                    backgroundSize: '100%',
                    width: '539px',
                    height: '485px',
                    padding: '45px 15px 15px 15px',
                    margin: 'auto'
                }}>
                    <h1 style={{ textAlign: 'center' }}>Efetue o seu Cadastro</h1>
                    <hr />

                    <Form.Group controlId="formBasicNome">
                        <Form.Control type="text" placeholder="Nome" name="name" maxlength="100" style={{
                            backgroundColor: '#139548',
                            borderBottom: '2px solid white',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            width: '80%',
                            marginLeft: '50px',
                            marginTop: '25px',
                            color: 'white',
                            outline: 'none',
                            border: 'none',
                            borderTopStyle: 'hidden',
                            borderRightStyle: 'hidden',
                            borderLeftStyle: 'hidden',
                            borderBottomStyle: 'groove'
                        }}
                            onChange={formik.handleChange} value={formik.values.name} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" name="email" style={{
                            backgroundColor: '#139548',
                            borderBottom: '2px solid white',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            width: '80%',
                            marginLeft: '50px',
                            marginTop: '25px',
                            color: 'white',
                            outline: 'none',
                            border: 'none',
                            borderTopStyle: 'hidden',
                            borderRightStyle: 'hidden',
                            borderLeftStyle: 'hidden',
                            borderBottomStyle: 'groove'
                        }} 
                            onChange={formik.handleChange} value={formik.values.email} required />
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Senha" name="password" style={{
                            backgroundColor: '#139548',
                            borderBottom: '2px solid white',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            width: '80%',
                            marginLeft: '50px',
                            marginTop: '25px',
                            color: 'white',
                            outline: 'none',
                            border: 'none',
                            borderTopStyle: 'hidden',
                            borderRightStyle: 'hidden',
                            borderLeftStyle: 'hidden',
                            borderBottomStyle: 'groove'
                        }}
                            onChange={formik.handleChange} value={formik.values.password} required />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}
                        style={{
                            marginTop: '25px',
                            marginLeft: '40%'
                        }}>
                        Cadastrar
                    </Button>
                    <br /><br />
                    <a href='/login' style={{ marginTop: '30px', marginLeft: '50px', textDecoration: 'none' }}>Já possuo uma conta.</a>
                </Form>
            </Container>
            <div style={{ marginTop: '100px' }}></div>
            <Rodape />
        </div>
    )

}

export default Cadastrar;