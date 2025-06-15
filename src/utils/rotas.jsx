import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Login from "../paginas/conta/login";
import Cadastrar from "../paginas/conta/cadastrar";
import ResetarSenha from "../paginas/conta/resetarsenha";
import Home from "../paginas/home";
import Laboratorios from "../paginas/laboratorios";
import Chatbot from "../paginas/chatbot";
import Perfil from "../paginas/conta/perfil";
import FAQ from "../paginas/FAQ";
import NaoEncontrada from "../paginas/error/notfound";
import SemPermissao from "../paginas/error/sempermissao";
import Consultas from "../paginas/consultas";
import AdminConsultas from "../paginas/admin/consultas";

const RotaPrivada = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') !== null ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
);

const RotaPrivadaAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') !== null && jwt_decode(localStorage.getItem('token')).role === 'admin' ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    }
  />
);

const Rotas = () => {
  return(
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/cadastrar' component={Cadastrar} />
        <Route path='/resetar-senha' component={ResetarSenha} />
        <Route path='/FAQ' component={FAQ} />
        <RotaPrivada path='/consultas' component={Consultas} />
        <RotaPrivada path='/perfil' component={Perfil} />
        <RotaPrivada path='/chatbot' component={Chatbot} />
        <RotaPrivada path='/laboratorios' component={Laboratorios} />
        <RotaPrivadaAdmin path='/admin/consultas' component={AdminConsultas} />
        <Route path='/sempermissao' component={SemPermissao} />
        <Route component={NaoEncontrada} />
      </Switch>
    </Router>
  )
}


export default Rotas;