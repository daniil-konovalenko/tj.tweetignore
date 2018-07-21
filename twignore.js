// alert('started');
// debugger;
// alert('script executed');
let blockedAuthors = new Set()
function parseTwitterLink(link) {
    return link.replace('https://twitter.com/', '')
}
function parseTweetAuthor(tweet) {
    const authorTwitterLink = tweet.querySelector('.tweet__user > a').href;
    return parseTwitterLink(authorTwitterLink)
}
function hideBlockedTweets(blockedAuthors) {
    const tweetAuthorAnchors = document.querySelectorAll('.tweet > .tweet__user > a');
    tweetAuthorAnchors.forEach(authorAnchor => {
        let authorUsername = parseTwitterLink(authorAnchor.href);
        if (blockedAuthors.has(authorUsername)) {
            tweet = authorAnchor.parentElement.parentElement;
            tweet.classList.add('tweetignore-block')
        }
    });
}
function blockUser(username) {
    blockedAuthors.add(username);
    chrome.storage.sync.set({twignoreAuthors: Array.from(blockedAuthors)})
    hideBlockedTweets(blockedAuthors);
}
function renderBlockButton(tweet) {
    const tweetAuthor = parseTweetAuthor(tweet);
    let blockButton = document.createElement('div');
    blockButton.className = 'tweetignore-block-button';
    blockButton.innerHTML = `<a href="#">Заблокировать</>`;
    blockButton.addEventListener('click', function() {
        blockUser(tweetAuthor);
    })
    let usernameElem = tweet.querySelector('.tweet__user');
    usernameElem.appendChild(blockButton);
}
const tweets = document.querySelectorAll('.tweet');
tweets.forEach(tweet => {
    renderBlockButton(tweet);
});
chrome.storage.sync.get(['twignoreAuthors'], function(result) {
    if (result.twignoreAuthors !== undefined) {
        debugger;
        blockedAuthors = new Set(result.twignoreAuthors)
        hideBlockedTweets(blockedAuthors);
    }
})
