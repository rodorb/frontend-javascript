import { NotificationController } from "../shared/notification/NotificationController.js";
import { LoginController } from "./LoginController.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginFormElement = document.querySelector('form');
    const notificationElement = document.querySelector('.notification')
    const loginController = new LoginController(loginFormElement);
    const notificationController = new NotificationController(notificationElement);
})