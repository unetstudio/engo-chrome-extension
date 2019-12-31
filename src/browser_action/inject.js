/**
 * Handle link click
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
 * DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
    actionLink()
});
