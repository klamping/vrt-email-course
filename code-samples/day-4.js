var wdio = require("webdriverio");
var browser = wdio.remote({
  desiredCapabilities: {
    browserName: "chrome"
  }
}).init();

require('webdrivercss').init(browser);

var menuIcon = {
    name: "Menu Icon",
    elem: ".menu a"
};

var menu = {
    name: "Menu",
    elem: ".main_menu"
};

browser.url("http://outdatedbrowser.com/en")
    .webdrivercss("Main Menu Icon", menuIcon)
    .click(menuIcon.elem)
    .pause(1000)
    .webdrivercss("Main Menu - Open", menu)
    .click("=THE PROJECT")
    .webdrivercss("Main Menu Icon - Projects", menuIcon)
    .getUrl().then(function(url) {
        console.log("Page url is: " + url);
    })
    .end();