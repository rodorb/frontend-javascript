'use strict';

import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signunp/SignupService.js";

export class LoginController {
    constructor(loginFormElement) {
        this.loginFormElement = loginFormElement;
        this.attachEvents();
    }

    attachEvents() {
        this.onAnyInputChanges();
        this.onSubmitLoginForm();
    }

    onAnyInputChanges() {
        const inputElements = Array.from(this.loginFormElement.querySelectorAll('input'));
        const buttonElement = this.loginFormElement.querySelector('button');
        inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                const areAllInputsFilled = inputElements.every(input => input.value);

                if (areAllInputsFilled) {
                    buttonElement.removeAttribute('disabled');
                } else {
                    buttonElement.setAttribute('disabled', '');
                }
            })
        });
    }

    onSubmitLoginForm() {
        this.loginFormElement.addEventListener('submit', ($event) => {
            $event.preventDefault();
            const formData = new FormData(this.loginFormElement);
            //new FormData(<formNodeElement>).get(<name del input de los que queramos sacar los valores>)
            const user = formData.get('user');
            const password = formData.get('password');
            this.loginUser(user, password);
        });
    }

    async loginUser(userName, passwordInput) {
        try {
            await signupService.loginUser(userName, passwordInput);
            window.location.href = '/'; //dentro del domino en el que estemos, que vaya a la raíz
        } catch (error) {
            pubSub.publish(
                pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                error
            );
        }
    }
}