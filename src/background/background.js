/**
 * Context menu
 * @type {string}
 */
let createURL = ENGOPRO.URL + "words/create?q=";

chrome.contextMenus.create({
    "title": ENGOPRO.NAME,
    "contexts": ["page", "selection"],
    "onclick": function (e) {
        let url = e.pageUrl;
        let selectionText = e.selectionText
        if (selectionText) {
            createURL += encodeURI(selectionText)
        }

        createURL += "&ref=" + encodeURI(url);
        chrome.tabs.create({"url": createURL});
        url = ''
        selectionText = ''
    }
});
