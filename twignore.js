class TweetsBlocker {
    constructor(blockedAuthors) {
        this.tweets = document.querySelectorAll('.tweet');
        if (blockedAuthors !== undefined) {
            this.blockedAuthors = new Set(blockedAuthors)
        } else {
            this.blockedAuthors = new Set();
        }
    }

    getTweetAuthor(tweet) {
        const authorTwitterLink = tweet.querySelectorAll('.tweet__user > a')[0].href;
        return authorTwitterLink.split('twitter.com/')[1];
    }

    hideBlockedTweets() {
        const blockedtweets = Array.prototype.filter.call( this.tweets,
            (tweet) => this.blockedAuthors.has(this.getTweetAuthor(tweet))
        );

        Array.prototype.forEach.call( blockedtweets,
            (tweet) => tweet.classList.add('tweetignore-block')
        );
    }

    blockUser(username) {
        this.blockedAuthors.add(username);
        chrome.storage.sync.set({twignoreAuthors: [...this.blockedAuthors]}, function (){})
        this.hideBlockedTweets();
    }

    renderBlockButton(tweet) {
        const tweetAuthor = this.getTweetAuthor(tweet);

        let blockButton = document.createElement('div');
        blockButton.className = 'tweetignore-block-button';
        blockButton.innerHTML = `<a href="#">Заблокировать</>`;
        blockButton.addEventListener('click', () =>  this.blockUser(tweetAuthor))

        tweet.querySelector('.tweet__user').appendChild(blockButton);
    }

    init() {
        this.tweets.forEach(tweet => this.renderBlockButton(tweet));
        this.hideBlockedTweets();
    }
}

chrome.storage.sync.get(['twignoreAuthors'], function(result) {
    const Blocker = new TweetsBlocker(result.twignoreAuthors);
    Blocker.init();
})
