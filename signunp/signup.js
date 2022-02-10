'use strict';
import { NotificationController } from "../shared/notification/NotificationController.js";
import { SignupController } from "./SignUpController.js";
document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.querySelector('form#signupForm');
    const notificationElement = document.querySelector('div.notification');
    const signUpController = new SignupController(formElement);
    const notificationController = new NotificationController(notificationElement);
    console.log("signUpcontroller ready");
});


/**
 * Responsabilidades del controlador SingupController
 * - El campo usuario es obligatorio
 * - Los campos contraseña deben ser obligatorias
 * - El botón debe habilitarse solo cuando los campos obligatorios esten rellenos
 * - Las contraseñas deben ser iguales
 * - Contraseña con un mínimo de 5 caracteres
 * - Hacer que la contraseña se vea
 * - Submit debe crear un usuario con esos datos
 * 
 */