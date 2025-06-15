import { Container, Form, Button, Jumbotron } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import Robot from '../../../assets/img/robot.png';
import Rodape from '../../../componentes/rodape';
import { useHistory } from 'react-router-dom';
import Menu from '../../../componentes/menu';
import conta from '../../../servicos/conta';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const ResetarSenha = () => {
    const { addToast } = useToasts();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            conta
                .resetarSenha(values)
                .then(resultado => {
                    if (resultado.data.success) {
                        addToast(resultado.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                        history.push('/login');
                    } else {
                        addToast(resultado.data.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    }
                })
                .catch(error => console.error(error));
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('É obrigatorio preencher este campo.')
        })
    });

    return (
        <div>
            <Menu />
            <div className="imgBanner">
                <Jumbotron>
                    <Container>
                        <div style={{ marginTop: '-90px' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: '1000', marginLeft: "10%", width: "100%" }}>Resetar Senha</h1>
                        </div>
                    </Container>
                </Jumbotron>
                <a href="/FAQ" style={{ position: "relative", top: "80px", marginRight: "5%" }}><img src={Robot} alt='Logo' style={{ width: '130px', objectFit: "contain" }} /></a>
            </div>

            <Container className='form-height placeholderBranco'>
                <Form onSubmit={formik.handleSubmit} style={{
                    backgroundColor: '#139548',
                    color: 'white',
                    borderRadius: '26px',
                    backgroundSize: '100%',
                    width: '40%',
                    padding: '15px',
                    margin: 'auto'
                }}>
                    <h1 style={{ textAlign: 'center' }}>Esqueci minha senha</h1>
                    <hr />

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" name="email" className="formInput" onChange={formik.handleChange} value={formik.values.email} required />
                    </Form.Group>
                    <p style={{ fontSize: '10px', marginLeft: '50px', color: '#F3A71A' }}>*Envie um email de recuperação de senha.</p>
                    <br />
                    <Button variant="primary" type="submit" style={{marginLeft:"40%"}}>Enviar</Button>
                    <br /><br />
                    <a href='/login' style={{ marginTop: '30px', textDecoration: 'none', marginLeft: '50px' }}>Efetuar login no sistema.</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )

}

export default ResetarSenha;