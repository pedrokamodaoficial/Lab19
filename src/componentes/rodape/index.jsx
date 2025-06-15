import React from 'react';
import Logo from '../../assets/img/logo.png';
import Instagram from '../../assets/img/instagram.svg';
import Facebook from '../../assets/img/facebook.svg';
import Twitter from '../../assets/img/twitter.svg';
import Linkedin from '../../assets/img/linkedin.svg';
import './index.css';

const Rodape = () => {
    return (
        <footer id="rodape">
            <div className="conteudoRodape" style={{ zIndex: '999' }}>
                <div style={{ zIndex: '999' }}>
                    <small>Redes Sociais</small>
                </div>
                <div className='Rede' style={{ zIndex: '998' }}>
                    <i className=""><a href="https://www.instagram.com"><img src={Instagram} alt='Instagram' className="icons" style={{ width: '32px' }} /></a></i>
                    <i className=""><a href="https://www.facebook.com"><img src={Facebook} alt='Facebook' className="icons" style={{ width: '32px' }} /></a></i>
                    <i className=""><a href="https://twitter.com"><img src={Twitter} alt='Twitter' className="icons" style={{ width: '32px' }} /></a></i>
                    <i className=""><a href="https://br.linkedin.com"><img src={Linkedin} alt='Linkedin' className="icons" style={{ width: '32px' }} /></a></i>
                </div>

                <div style={{ zIndex: '997' }}>
                    <small>Entre em contato conosco</small>
                </div>

                <div className="img" style={{ zIndex: '996' }}>
                    <h1 ><a href="/"><img src={Logo} alt='Logo' style={{ width: '150px', height: 'auto' }} /></a></h1>
                </div>

                <div className="copyright" style={{ zIndex: '995' }}>
                    <small>Desenvolvido por <a href="https://dev.azure.com/brenomax02/" style={{ textDecoration: 'none' }}>Turma do PaCode</a>, copyright 2021</small>
                </div>
            </div>
        </footer>
    )
}

export default Rodape;