document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByClassName("link");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            console.log('location', location);
            ln.onclick = function () {
                if (location !== undefined && location !== '') {
                    chrome.tabs.create({active: true, url: location});
                }
            };
        })();
    }
});
