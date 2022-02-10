import { pubSub } from "../shared/pubSub.js";

//modelo
import tweetService from "./TweetService.js";
//vista
import { createTweetTemplate, createSpinner, buildNotFoundTweetsView } from "./TweetView.js"

export async function tweetListController(tweetListElement) {
    const spinner = createSpinner();
    tweetListElement.innerHTML = spinner;
    try {
        //  contenedor donde pintar los tweets 
        let tweetList = await tweetService.getTweetsAsyncAwait();
        console.log(tweetList);
        if (tweetList.length === 0) {
            this.tweetListElement.innerHTML = buildNotFoundTweetsView();
        }

        for (const tweet of tweetList) {
            const tweetTemplate = createTweetTemplate(tweet);
            //no se puede usar createElement dentro del nodo que usamos, por lo que lo hacemos desde document
            const tweetArticleElement = document.createElement('article');
            tweetArticleElement.innerHTML = tweetTemplate;

            //  incluir tweet en el DOM
            tweetListElement.appendChild(tweetArticleElement);
        }
    } catch (error) {
        console.error(error);
        alert("Error al obtener los tweets")
    } finally {
        //quitar spinner, desde el nodo donde se ha creado
        // tweetListElement.querySelector('.loader').remove();
        //lo elimino añadiendole la clase hidden
        tweetListElement.querySelector('.loader').classList.add("hidden");
    }

}



export class TweetListController {
    constructor(tweetListElement) {
        this.tweetListElement = tweetListElement;
    }

    async showTweets() {
        const spinner = createSpinner();
        this.tweetListElement.innerHTML = spinner;
        try {
            //  contenedor donde pintar los tweets 
            let tweetList = await tweetService.getTweetsAsyncAwait();
            if (tweetList.length === 0) {
                this.tweetListElement.innerHTML = buildNotFoundTweetsView();
            }
            for (const tweet of tweetList) {
                const tweetTemplate = createTweetTemplate(tweet);
                //no se puede usar createElement dentro del nodo que usamos, por lo que lo hacemos desde document
                const tweetArticleElement = document.createElement('article');
                tweetArticleElement.innerHTML = tweetTemplate;

                //  incluir tweet en el DOM
                this.tweetListElement.appendChild(tweetArticleElement);
            }
        } catch (error) {
            console.error(error);
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, "Error al obtener los tweets");
            // this.notificationController.show("Error al obtener los tweets");
            // alert("Error al obtener los tweets")
        } finally {
            //quitar spinner, desde el nodo donde se ha creado
            // tweetListElement.querySelector('.loader').remove();
            //lo elimino añadiendole la clase hidden
            this.tweetListElement.querySelector('.loader').classList.add("hidden");
        }
    }


}
//objetivos de un controlador:
// - Orquestación o intermeedario entre vista y modelo
// - Definir y manejar eventos
// - Validar Datos
// - Gestionar errores
// - Desacoplamiento entre capas (vistas y modelos)
// - Un controlador (en el frontEnd) debe ocuparse de gestionar un nodo DOM en cuanto
//   a datos que debe pintar y eventos que suceden