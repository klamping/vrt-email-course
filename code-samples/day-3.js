var wdio = require("webdriverio");
var browser = wdio.remote({
  desiredCapabilities: {
    browserName: "chrome"
  }
}).init();

require('webdrivercss').init(browser);

browser.url("http://learn.visualregressiontesting.com")
  .webdrivercss("homepage", [
    {
      name: "header",
      elem: ".header"
    },
    {
      name: "benefits",
      elem: ".benefits",
      screenWidth: [320,640,1024]
    }
  ])
  .end();