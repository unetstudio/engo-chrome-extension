/**
 * Browser action
 * @type {string}
 */
let createURL = ENGOPRO.URL + "words/create?q=";

/**
 * getCurrentTabUrl
 * @param callback
 */
function getCurrentTabUrl(callback) {
    let queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        let tab = tabs[0];
        let url = tab.url;
        callback(url);
    });
}

/**
 * getSelectionText
 * @param callback
 */
function getSelectionText(callback) {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        if (selection !== null && selection !== undefined && selection.length) {
            callback(selection[0])
        }
    });
}

/**
 * Handle link lick
 */
function actionLink() {
    let links = document.getElementsByClassName("link");
    for (let i = 0; i < links.length; i++) {
        (function () {
            let ln = links[i];
            let location = ln.href;
            ln.onclick = function () {
                if (location !== undefined && location !== '') {
                    chrome.tabs.create({active: true, url: location});
                }
            };
        })();
    }
}

/**
 * Trigger when click
 */
function actionClick() {
    let createSelect = document.getElementById('engopro-select');
    createSelect.onclick = function () {
        getCurrentTabUrl(function (url) {
            let host = new URL(url);
            url = host.hostname;

            getSelectionText(function (selectionText) {
                if (selectionText) {
                    createURL += encodeURI(selectionText)
                    createURL += "&ref=" + encodeURI(url);
                    chrome.tabs.create({"url": createURL});
                    url = ''
                    selectionText = ''
                } else {
                    alert('Không có văn bản nào được chọn!')
                }
            })
        })
    };
}

/**
 * DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("engopro-name").innerText = ENGOPRO.NAME
    actionLink()
    actionClick()
});
