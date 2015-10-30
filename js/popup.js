(function() {

  console.log(location.href);

  var $cookiesTable = $('.cookies-list');
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabs) {
    var tabID = tabs[0].id;
    chrome.tabs.get(tabID, function(tab) {
      if (tab.url) {
        var url = new URL(tab.url);
        chrome.cookies.getAll({
          domain: url.host
        }, function(cookiesList) {
          cookiesList.forEach(function(element, index) {
            var row = $('<tr/>');
            $('<td/>').text(element.domain).appendTo(row);
            $('<td/>').text(element.name).appendTo(row);
            $('<td/>').text(element.path).appendTo(row);
            $('<td/>').text(element.value).appendTo(row);
            $('<td/>').text(element.expirationDate).appendTo(
              row);
            $('<td/>').text(element.hostOnly).appendTo(row);
            $('<td/>').text(element.httpOnly).appendTo(row);
            $('<td/>').text(element.session).appendTo(row);
            $('<td/>').text(element.storeId).appendTo(row);
            $('<td/>').text(element.secure).appendTo(row);
            $cookiesTable.append(row);
          });
        });
      }
    });
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(currentTab) {
    var tempWindows, target;
    console.log(currentTab[0]);
    console.log(currentTab[0].windowId);
    tempWindows = chrome.extension.getViews({
      windowId: currentTab[0].windowId
    });

    console.log(tempWindows[0].document);

  });

})();
