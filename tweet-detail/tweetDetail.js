import { NotificationController } from "../shared/notification/NotificationController.js";
import { TweetDetailController } from "./TweetDetailController.js";

document.addEventListener('DOMContentLoaded', async() => {
    const tweetDetailElement = document.querySelector('section.tweet-detail')
    const notificationElement = document.querySelector('div.notification');
    const notificationController = new NotificationController(notificationElement);

    const searchParams = new URLSearchParams(window.location.search);
    const tweetId = searchParams.get('id');
    const tweetDetailController = new TweetDetailController(tweetDetailElement);
    await tweetDetailController.showTweet(tweetId);

});