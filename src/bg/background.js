// Set up the context menus
chrome.contextMenus.create({
    "title": "Engo Pro",
    "contexts": ["page", "selection"],
    "onclick": function (e) {
        let url = e.pageUrl;
        let createURL = "https://engo.pro/words/create?q=";
        const selectionText = e.selectionText
        if (selectionText) {
            createURL += encodeURI(selectionText)
        }

        createURL += "&ref=" + encodeURI(url);
        chrome.tabs.create({"url": createURL});
    }
});
