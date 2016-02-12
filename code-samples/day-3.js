var wdio = require("webdriverio");
var assert = require('assert');
var webdrivercss = require('webdrivercss');

var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

var browser = wdio.remote(options);

webdrivercss.init(browser);

browser
  .init()
  .url("https://learn.visualregressiontesting.com")
  .webdrivercss('homepage',[
    {
      name: 'header',
      elem: '.header'
    },
    {
      name: 'benefits',
      elem: '.benefits',
      screenWidth: [320,640,1024]
    }
  ])
  .end();
