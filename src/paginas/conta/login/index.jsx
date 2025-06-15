import React from 'react';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';
import { useFormik } from 'formik';
import { Container, Form, Button, Jumbotron } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import conta from '../../../servicos/conta';
import './index.css';
import Robot from "../../../assets/img/robot.png";

const Login = () => {
    const { addToast } = useToasts();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, { setSubmitting }) => {
            conta.logar(values)
                .then(resultado => {
                    setSubmitting(false);
                    if (resultado.data.success) {
                        addToast(resultado.data.message, {
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
        },
    });

    return (
        <div>
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width:"100%"  }}>Login</h1>
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
                    height: '454px',
                    padding: '45px 15px 15px 15px',
                    margin: 'auto'
                }}>
                    <h1 style={{ textAlign: 'center' }}>Efetue o seu Login</h1>
                    <hr />

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
                        Entrar
                    </Button>
                    <br /><br />
                    <a href='/resetar-senha' style={{ marginTop: '30px', marginLeft: '50px', textDecoration: 'none' }}>Esqueci minha senha.</a>
                    <br />
                    <a href='/cadastrar' style={{ textDecoration: 'none', marginLeft: '50px' }}>Ainda não possuo uma conta.</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )

}

export default Login;