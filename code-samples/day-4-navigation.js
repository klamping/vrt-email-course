var wdio = require("webdriverio");

var options = {
  desiredCapabilities: {
    browserName: "firefox"
  }
};

var browser = wdio.remote(options);

require("webdrivercss").init(browser, {
  screenWidth: [320,640,1024]
});

var menuIcon = {
  name: "Menu Icon",
  elem: ".menu a"
};
var menu = {
  name: "Menu",
  elem: ".main_menu"
};
var projectLink = menu.elem + " a[href$=project]";

browser
  .init()
  .url("http://outdatedbrowser.com/en")
  .webdrivercss("Main Menu Menu Icon", menuIcon)
  .click(menuIcon.elem)
  .webdrivercss("Main Menu Open", menu)
  .click(projectLink)
  // WebdriverIO will wait here until the "About" page loads
  .click(menuIcon.elem)
  .webdrivercss("Main Menu - Projects Page", menu)
  .getUrl()
  .then(function(url) {
    console.log(url);
    // outputs:
    // http://outdatedbrowser.com/en/project
  })
  .end();
