import http from '../utils/http-axios';

const listar = () => {
    return http.get('api/laboratories', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export default listar;