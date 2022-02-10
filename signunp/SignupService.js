'use strict';

class SignupService {
    constructor() {}

    async createUser(userName, password) {
        const body = {
            username: userName,
            password: password
        }


        //fetch usando petición post
        const httpResponse = await fetch(
            'http://localhost:8000/auth/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const createUserResponse = await httpResponse.json();
        if (!httpResponse.ok) {
            throw new Error(createUserResponse.message);
        }
    }

    async loginUser(username, password) {
        const body = {
                username,
                password
            }
            //fetch usando petición post
        const httpResponse = await fetch(
            'http://localhost:8000/auth/login', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const loginUserResponse = await httpResponse.json();
        if (!httpResponse.ok) {
            throw new Error(loginUserResponse.message);
        }

        const JWT_TOKEN = loginUserResponse.accessToken;
        localStorage.setItem('userToken', JWT_TOKEN.toString())

    }


    getLoggedUser() {
        return localStorage.getItem("userToken") || null;
    }
}

//singleton
export const signupService = new SignupService();