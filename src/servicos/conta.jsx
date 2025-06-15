import http from '../utils/http-axios';

const logar = dados => {
    return http.post('v1/account/signin', JSON.stringify(dados));
}

const cadastrar = dados => {
    return http.post('v1/account/signup', JSON.stringify(dados));
}

const resetarSenha = dados => {
    return http.put('v1/account/reset-password', JSON.stringify(dados));
}

const alterarDados = dados => {
    return http.put('v1/account/' + dados.id, JSON.stringify(dados));
}

const alterarSenha = dados => {
    return http.put('v1/account/change-password/' + dados.id, JSON.stringify(dados))
}

const buscarId = id => {
    return http.get('v1/account/users/' + id)
}

export default {
    logar,
    cadastrar,
    resetarSenha,
    alterarDados,
    buscarId,
    alterarSenha
}