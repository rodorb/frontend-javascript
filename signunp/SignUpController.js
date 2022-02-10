'use strict';
import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signunp/SignupService.js";;
export class SignupController {
    constructor(formElement) {
        this.formElement = formElement;
        this.subscribeToEvents()
    }

    subscribeToEvents() {
        this.onAnyInputChanges();
        this.onFormSubmit();
    }


    onAnyInputChanges() {
        const inputsElements = this.formElement.querySelectorAll('input');
        const submitButton = this.formElement.querySelector('button');
        inputsElements.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkIfAllInputsAreFilled(inputsElements, submitButton);
            });
        });

        // inputsElements.forEach((inputElement) => { addEventToEachInput(inputElement) });

        // function addEventToEachInput(inputElement) {
        //     inputElement.addEventListener('click', () => { eachTimeInputIsUpdated() })
        // }

        // function eachTimeInputIsUpdated() {
        //     const allInputsHaveValue = Array.from(inputsElements).every((inputElement) => inputElement.value);
        //     if (allInputsHaveValue) {
        //         submitButton.removeAttribute('disabled');
        //     } else {
        //         submitButton.setAttribute('disabled', '');
        //     }
        // }

    }

    checkIfAllInputsAreFilled(inputsElements, submitButton) {
        const allInputsHaveValue = Array.from(inputsElements).every((inputElement) => inputElement.value);
        if (allInputsHaveValue) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', '');
        }
    }

    async onFormSubmit() {
        this.formElement.addEventListener('submit', ($event) => {
            $event.preventDefault(); //elimino el comportamiento por defecto del submit, ya que en el formulario el comportamiento por defecto al hacer el submit es intentar hacer la petición sobre el dominio en el que estemos

            const formData = new FormData(this.formElement);
            const userName = formData.get('textInput');
            const passwordInput = formData.get('passwordInput');
            const passwordMatchInput = formData.get('passwordMatchInput');
            const passwordsAreEqual = this.checkIfPasswordsAreEqual(passwordInput, passwordMatchInput);
            const passwordMatchesRegexp = this.checkIfPasswordsMatchesRegExp(passwordInput);
            if (!passwordsAreEqual) {
                pubSub.publish(
                    pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                    'Las contraseñas no son iguales'
                );
                return;
            }

            if (!passwordMatchesRegexp) {
                pubSub.publish(
                    pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                    'Las contraseñas deben tener solo números y letras'
                );
                return;
            }

            this.createUser(userName, passwordInput);


        });
    }

    async createUser(userName, passwordInput) {
        try {
            await signupService.createUser(userName, passwordInput);
        } catch (error) {
            pubSub.publish(
                pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                error
            );
        }
    }



    checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
        return passwordInput === passwordMatchInput;
    }

    checkIfPasswordsMatchesRegExp(passwordInput) {
        const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);
        return passwordRegExp.test(passwordInput);
    }
}