let createURL = 'http://engo.pro/words/create?q='

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByClassName("link");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                if (location !== undefined && location !== '') {
                    chrome.tabs.create({active: true, url: location});
                }
            };
        })();
    }
});

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function getSelectedText(callback) {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        callback(selection[0])
    });
}

function getAllText(callback) {
    chrome.tabs.executeScript({
        code: "document.body.innerText"
    }, function (text) {
        callback(text)
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var createSelect = document.getElementById('create-select');
    var createAll = document.getElementById('create-all');

    createSelect.onclick = function () {
        getCurrentTabUrl(function (url) {
            var host = new URL(url);
            url = host.hostname;

            getSelectedText(function (selectedText) {
                if (selectedText) {
                    createURL += encodeURI(selectedText)
                }

                createURL += "&ref=" + encodeURI(url);
                chrome.tabs.create({"url": createURL});
            })
        })
    };

    createAll.onclick = function () {
        getCurrentTabUrl(function (url) {
            var host = new URL(url);
            url = host.hostname;

            getAllText(function (allText) {
                if (allText) {
                    createURL += encodeURI(allText)
                }

                createURL += "&ref=" + encodeURI(url);
                chrome.tabs.create({"url": createURL});
            })
        })
    };
});
