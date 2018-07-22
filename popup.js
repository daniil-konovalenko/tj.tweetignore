function deleteFromBlackList(blacklist, blockedAuthors, username) {    
    blockedAuthors.delete(username);
    chrome.storage.sync.set({twignoreAuthors: Array.from(blockedAuthors)}, function() {
        renderBlackList(blacklist, blockedAuthors)
    })
}
function renderBlackList(blacklist, blockedAuthors) {
    blacklist.innerHTML = ''
    blockedAuthors.forEach(function(author) {
        let item = document.createElement('li');
        item.innerHTML = `<span>${author}</span><span style="float: right"><a href="#">Разблокировать</a></span>`
        item.addEventListener('click', function () {
            deleteFromBlackList(blacklist, blockedAuthors, author)
        })
        blacklist.appendChild(item)
    })
}

window.onload = function() {
    let blacklist = document.getElementById('blacklist')
    let blockedAuthors = new Set();
    chrome.storage.sync.get(['twignoreAuthors'], function(result) {
        if (result.twignoreAuthors !== undefined) {
            blockedAuthors = new Set(result.twignoreAuthors)
        }
        renderBlackList(blacklist, blockedAuthors)
    })
}
