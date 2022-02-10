//modelo
import { tweetListController, TweetListController } from "./TweetsController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
//cuando el DOM esté listo
//ejecuto el controlador
document.addEventListener('DOMContentLoaded', async() => {
    const tweetListElement = document.querySelector('section.tweet-list');
    const notificationElement = document.querySelector('div.notification');
    const notificationController = new NotificationController(notificationElement);

    //Al controlador se le pasa el nodo HTML sobre el que tiene que actuar
    const tweetListController = new TweetListController(tweetListElement);

    await tweetListController.showTweets();
})


async function calculateRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 10);
            if (randomNumber % 2 === 0) {
                resolve(randomNumber);
            } else {
                reject(randomNumber);
            }

        }, 1500);
    })

}


try {
    console.log("Antes de calcular");
    console.log(await calculateRandomNumber(), 'es par');
} catch (error) {
    console.log(error, 'no es par');
} finally {
    console.log("Después de calcular");
}







// const buttonListElement = document.querySelectorAll('button');
// // buttonListElement.forEach((buttonElement) => {
// //     buttonElement.addEventListener('click', () => {
// //         drawTime();
// //     });
// // });

// for (const button of buttonListElement) {
//     button.addEventListener('click', ($event) => {
//         drawTime($event.target.textContent);
//     });
// }

// function drawTime(message) {
//     document.getElementById('demo').innerHTML = message;
// }



// document.querySelector('a').addEventListener('click', ($event) => {
//     $event.preventDefault(); //eliminar el comportamiento por defecto de una etiqueta html
//     // window.location.href = ;
//     window.open("https://google.com");
// });



// const divListElement = document.querySelectorAll('div');

// divListElement.forEach((div) => {
//     div.addEventListener('click', ($event) => {
//         //si pulso en el div más interior de todos, 
//         //tambien hace el log de todos sus padres, 
//         //ya que el evento se propaga hacia todos los padres
//         //porque he definido un listener para cada div
//         //si solo tuviera un listener asociado a un solo div, esto no pasaría
//         console.log($event.target);

//         //para detener la propagación del evento, puedo usar el metodo stopPropagation
//         $event.stopPropagation();
//     })
// });

// si solo tuviera un listener por el unico div que tenga este id,
// entonces no se propagaria el evento ya que solo tengo un listner 
//asociado a ese unico elemento con ese unico id
// document.querySelector('div#inner-div').addEventListener('click', ($event) => {
//     console.log($event.target);
// })