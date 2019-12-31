/**
 * Context menu
 * @type {string}
 */

chrome.contextMenus.create({
    "title": ENGOPRO.NAME,
    "contexts": ["page", "selection"],
    "onclick": function (e) {
        const CREATE_URL = ENGOPRO.URL + "words/create?q=";
        const url = e.pageUrl;
        const host = new URL(url);
        const site = host.hostname;

        let createURL = CREATE_URL
        let selectionText = e.selectionText
        if (selectionText) {
            createURL += encodeURI(selectionText)
        }

        createURL += "&ref=" + encodeURI(site);
        chrome.tabs.create({"url": createURL});
    }
});
