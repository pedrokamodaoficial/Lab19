import { Navbar, Nav, Container, Popover, Overlay, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef } from 'react'
import jwt from 'jwt-decode';
import './index.css';

const Menu = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState("");
    const history = useHistory();

    const Sair = () => {
        const [show, setShow] = useState(false);
        const target = useRef(null);

        return (
            <>
                <Button bsPrefix="nav-button" ref={target} onClick={() => setShow(!show)}>Sair</Button>
                <Overlay target={target.current} show={show} placement="bottom" rootClose={true}>
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                                marginTop: "10px",
                                border: '1px solid #a6a6a6',
                                backgroundColor: 'white',
                                borderRadius: 3,
                                zIndex: 99,
                                color: 'black',
                                ...props.style,
                            }}
                        >
                            <Popover.Title as="h3">Deseja realmente sair?</Popover.Title>
                            <Popover.Content bsPrefix="popoverContent">
                                <Button className="btnPopoverGreen" onClick={() => { localStorage.removeItem('token'); history.push('/login'); }} type="button">Sair</Button>
                                <Button className="btnPopoverGreen" onClick={() => setShow(false)} type="button">Não</Button>
                            </Popover.Content>
                        </div>
                    )}
                </Overlay>
            </>
        );
    }

    const menuTipoUsuario = () => {
        if (token === null) {
            return (
                <Nav style={{ fontSize: "20px" }}>
                    <Nav.Link bsPrefix="nav-item" href="/login" >Login</Nav.Link>
                    <Nav.Link bsPrefix="nav-item" href="/cadastrar">Cadastrar</Nav.Link>
                </Nav>
            )
        } else if (jwt(token).role === 'admin') {
            return (
                <Nav style={{ fontSize: "20px" }}>
                    <Nav.Link bsPrefix="nav-item" href="/laboratorios" style={{ position: 'relative', zIndex: '2' }}>Laboratorios</Nav.Link>
                    <Nav.Link bsPrefix="nav-item" href="/admin/consultas" style={{ position: 'relative', zIndex: '2' }}>Gerenciar Consultas</Nav.Link>
                    <Sair />
                </Nav>
            )
        } else {
            return (
                <Nav style={{ fontSize: "20px" }}>
                    <Nav.Link bsPrefix="nav-item" href="/perfil" style={{ position: 'relative', zIndex: '2' }}>Perfil</Nav.Link>
                    <Nav.Link bsPrefix="nav-item" href="/laboratorios" style={{ position: 'relative', zIndex: '2' }}>Laboratorios</Nav.Link>
                    <Nav.Link bsPrefix="nav-item" href="/consultas" style={{ position: 'relative', zIndex: '2' }}>Minhas Consultas</Nav.Link>
                    <Sair />
                </Nav>
            )
        }
    }

    return (
        <div id="chevron">
            <Container>
                <Navbar className="navbar" collapseOnSelect expand="lg" style={{ zIndex: "5", height: "auto" }}>
                    <Nav className="mr-auto" style={{ fontSize: "24px" }}>
                        { }
                        <Nav.Link bsPrefix="nav-item" href="/" style={{ marginLeft: '25px' }} >Home</Nav.Link>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav" />
                    {menuTipoUsuario()}
                </Navbar>
            </Container>
        </div>
    )
}

export default Menu