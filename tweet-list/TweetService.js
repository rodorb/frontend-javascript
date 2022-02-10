import { signupService } from "../signunp/SignupService.js";;

export default {
    getTweets() {
        return [{
                handler: 'user01',
                content: 'Algo que publico en twitter',
                createdAt: '2022-01-31'
            },
            {
                handler: 'user02',
                content: 'Algo que publico en twitter usuario 2',
                createdAt: '2022-02-31'
            },
            {
                handler: 'user03',
                content: 'Algo que publico en twitter usuario 3',
                createdAt: '2022-03-31'
            }
        ];
    },

    fetchTweetsFromAPI() {
        const URL = "https://gist.githubusercontent.com/edu-aguilar/8c9a509ec582d04da0640be2b0ede8d5/raw/f75c68645821f3c33d82d9c2c048215584d1d332/tweets.json";
        return fetch(URL)
            .then((responseHttp) => {
                return responseHttp.json();
            }).catch((error) => {
                console.error(error);
                throw "ERROR IN HTTP REQUEST";
            }).then((jsonResponse) => {
                return jsonResponse;
            }).catch((err) => {
                console.error(err);
                throw "ERROR FORMATTING TO JSON";
            })
    },

    async getTweetsAsyncAwait() {
        //sparest "http://localhost:8000/api/tweets"
        //twwets.json "https://gist.githubusercontent.com/edu-aguilar/8c9a509ec582d04da0640be2b0ede8d5/raw/f75c68645821f3c33d82d9c2c048215584d1d332/tweets.json" 
        const URL = "http://localhost:8000/api/tweets";
        let httpResponse;
        let jsonTweets;
        try {
            httpResponse = await fetch(URL);

        } catch (error) {
            console.error(error);
            throw new Error("ERROR IN HTTP REQUEST");
        }
        if (!httpResponse.ok) {
            throw new Error(`Tweets no encontrados. Status => ${httpResponse.status}`);
        }
        try {
            jsonTweets = await httpResponse.json();
        } catch (error) {
            console.error(error);
            throw new Error("ERROR FORMATTING TO JSON");
        }

        const transformedTweets = this.transformTweets(jsonTweets);
        return transformedTweets;
    },

    async getTweet(tweetId) {
        //sparest "http://localhost:8000/api/tweets"
        //twwets.json "https://gist.githubusercontent.com/edu-aguilar/8c9a509ec582d04da0640be2b0ede8d5/raw/f75c68645821f3c33d82d9c2c048215584d1d332/tweets.json" 
        const URL = `http://localhost:8000/api/tweets/${tweetId}`;
        let httpResponse;
        let jsonTweet;
        try {
            httpResponse = await fetch(URL);

        } catch (error) {
            console.error(error);
            throw new Error("ERROR IN HTTP REQUEST");
        }
        if (!httpResponse.ok) {
            throw new Error(`Tweet no encontrado. Status => ${httpResponse.status}`);
        }
        try {
            jsonTweet = await httpResponse.json();
        } catch (error) {
            console.error(error);
            throw new Error("ERROR FORMATTING TO JSON");
        }

        const transformedTweet = this.transformTweets([jsonTweet]);
        return transformedTweet[0];
    },

    transformTweets(jsonTweets) {
        return jsonTweets.map(tweet => {
            const transformedTweet = {
                content: tweet.content,
                userId: tweet.userId || tweet.handler,
                date: tweet.updatedAt || tweet.date,
                id: tweet.id || Math.random() * 10,
                retweets: tweet.retweets || 0,
                likes: tweet.likes || 0,
                image: tweet.avatar ||
                    "https://www.logocrea.com/wp-content/uploads/2012/12/twitter.png",
            }

            return transformedTweet;
        });
    },


    async deleteTweet(tweetId) {
        const URL = `http://localhost:8000/api/tweets/${tweetId}`;

        //fetch usando petición post
        try {
            await fetch(
                URL, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${signupService.getLoggedUser()}`
                    }
                });
        } catch (error) {
            throw new Error('No se ha podido borrar el tweet');
        }


    }

}


// responsabilidad del modelo:
// - abstraer al controlador y a la vista de la procedencia de los datos.
//