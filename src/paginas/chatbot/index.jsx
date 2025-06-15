import { Carousel, Jumbotron, Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import Rodape from '../../componentes/rodape';
import Menu from '../../componentes/menu';
import React from 'react';
import './index.css';
import Robo from '../../assets/img/robo.png';
import Robot from "../../assets/img/robot.png";


const Chatbot = () => {
  return (
    <div>
      <h2>Bem vindo</h2>
      <div className="Text1">
        <p>Para acessar o chatbot clique no botão no lado inferior direito e comece a conversar com Ian, nosso assistente</p>
        <p>Ele pode:</p>
      </div>
      <ul>
        <li>Tirar diversas duvidas sobre o Covid, é só perguntar!</li>
        <li>Fazer uma triagem</li>
        <li>Marcar uma consulta</li>
      </ul>
      <div className="Text1">
        <p>Fique a vontade para utilizar!</p>
      </div>
    </div>
  )
}

export default Chatbot;