export function createTweetTemplate(tweet) {
    const tweetPostedDate = new Date(tweet.date).toDateString();
    let tweetTemplate = `
    <a href="/tweetDetail.html?id=${tweet.id}">
    <h1>Soy el usuario ${tweet.userId}</h1>
    <p>${tweet.content}</p>
    <p>${tweetPostedDate}</p>
    <span>${tweet.retweets} retweets y  ${tweet.likes} likes</span>
    <img src=${tweet.image}></img>
    </a>`

    return tweetTemplate;
}

export function createSpinner() {

    return `
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`
}

export function buildNotFoundTweetsView() {
    return `
    <h1>No se ha encontrado ningún tweet</h1>
    `;
}