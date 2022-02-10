import { pubSub } from "./../shared/pubSub.js";
import { signupService } from "../signunp/SignupService.js";;

//modelo
import TweetService from "../tweet-list/TweetService.js";
import { createTweetTemplate } from "../tweet-list/TweetView.js";
import { decodeToken } from "../utils/decodeJwtToken.js";

export class TweetDetailController {
    constructor(tweetDetailElement) {
        this.tweetDetailElement = tweetDetailElement;
        this.tweet = null;
    }

    async showTweet(tweetId) {
        if (!tweetId) {
            pubSub.publish(
                pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                'Id de tweet inválido'
            );
            return;
        }

        try {
            this.tweet = await TweetService.getTweet(tweetId);
            const tweetTemplate = createTweetTemplate(this.tweet);
            this.tweetDetailElement.innerHTML = tweetTemplate;
            this.handleDeleteButton();
        } catch (error) {
            pubSub.publish(
                pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                error
            );
        }

    }

    handleDeleteButton() {
        const loggedUserToken = signupService.getLoggedUser();
        if (loggedUserToken) {
            const userDataFromToken = decodeToken(loggedUserToken);
            const userId = userDataFromToken.userId;
            const isOwner = this.isTweetOwner(userId);
            if (isOwner) {
                this.drawDeleteButton();
            }
        }
    }


    isTweetOwner(userId) {
        return userId === this.tweet.userId;
    }

    drawDeleteButton() {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = "Borrar Tweet";
        this.tweetDetailElement.appendChild(buttonElement);

        this.tweetDetailElement.addEventListener('click', () => {
            this.deleteTweet();
        })
    }

    async deleteTweet() {
        const shouldDeleteTweet = window.confirm('Estás seguro de borrar el tweet?');


        if (shouldDeleteTweet) {
            try {
                await TweetService.deleteTweet(this.tweet.id);
                window.location.href = "/";
            } catch (error) {
                pubSub.publish(
                    pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
                    'No se ha podido eliminar el tweet'
                );
            }

        }
    }
}