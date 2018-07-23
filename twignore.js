class TweetsBlocker {
    constructor(authors) {
        this.tweets = Array.from(document.querySelectorAll('.tweet'));
        this.blockedAuthors = (authors !== undefined) ? new Set(authors) : new Set();
    }

    getTweetAuthor(tweet) {
        const authorTwitterLink = tweet.querySelector('.tweet__user > a').href;
        return authorTwitterLink.split('twitter.com/')[1];
    }

    hideBlockedTweets(username) {
        this.tweets.filter(
            (tweet) => this.blockedAuthors.has(this.getTweetAuthor(tweet))
        ).forEach(
            (tweet) => tweet.classList.add('tweetignore-block')
        )
    }

    blockUser(username) {
        this.blockedAuthors.add(username);
        chrome.storage.sync.set(
            {twignoreAuthors: [...this.blockedAuthors]},
            this.hideBlockedTweets(username)
        );
    }

    renderBlockButton(tweet) {
        const tweetAuthor = this.getTweetAuthor(tweet);

        const blockButton = document.createElement('div');
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
