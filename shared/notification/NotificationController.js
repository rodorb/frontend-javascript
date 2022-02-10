'use strict';
import { pubSub } from "../pubSub.js";
import { buildNotificationView } from "./NotificationView.js";
export class NotificationController {
    constructor(notificationElement) {
        this.notificationElement = notificationElement;
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        pubSub.subscribe(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, (message) => {
            this.show(message);
        })
    }

    show(message) {
        const notificationTemplate = buildNotificationView(message);
        this.notificationElement.innerHTML = notificationTemplate;

        const closeButtonElement = this.notificationElement.querySelector('button');
        closeButtonElement.addEventListener('click', ($event) => {
            // const target = $event.target.
            // this.notificationElement.style.display = "none";
            this.notificationElement.innerHTML = "";
        });
    }


}