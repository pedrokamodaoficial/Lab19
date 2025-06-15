import axios from 'axios';
import http from '../utils/http-axios';

const listar = () => {
    return http.get('api/appointments', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

const cadastrarConsulta = dados => {
    return http.post('api/appointments/add', JSON.stringify(dados), {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

const alterarStatus = dados => {
    return http.put(`api/appointments/end/${dados.id}`, JSON.stringify(dados));
}

const buscarPorId = id => {
    return http.get(`/${id}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

const avaliar = dados => {
    return http.post(`api/appointments/${dados.idAppointment}/review/`, JSON.stringify(dados), {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

const remover = async id => {
    return await axios({
        method: 'DELETE',
        url: 'http://grupo2senai-001-site1.htempurl.com/api/appoitments/cancel',
        data: {
            idAppointment: id,
        },
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export default {
    listar,
    cadastrarConsulta,
    alterarStatus,
    buscarPorId,
    remover,
    avaliar
}
