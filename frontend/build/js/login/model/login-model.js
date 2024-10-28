import Environment from '../../shared/enviroments.js';
import Subject from '../types/subject.js';
export default class LoginModel extends Subject {
    constructor() {
        super();
    }
    init = async () => { };
    getUserById = async (id) => {
        const endpoint = await Environment.getUserById(id);
        // console.log(endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
            console.error('Error al obtener el usuario');
            return undefined;
        }
        const user = await response.json();
        console.log(user);
        return user;
    };
}
