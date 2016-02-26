var wdio = require("webdriverio");

var options = {
  desiredCapabilities: {
    browserName: "firefox"
  }
};

var browser = wdio.remote(options);

require("webdrivercss").init(browser, {
  screenWidth: [320,480,640,1024]
});

var mainNav = {
  name: "Main Nav",
  selector: ".main-nav"
};

browser
  .init()
  .url("http://mysite.com")
  .webdrivercss("Main Nav Default", mainNav)
  .click(".main-nav")
  .webdrivercss("Main Nav Open", mainNav)
  .click(".main-nav .about")
  .webdrivercss("Main Nav - About Page", mainNav)
  .getUrl()
  .then(function(url) {
    console.log(url);
  })
  .end();