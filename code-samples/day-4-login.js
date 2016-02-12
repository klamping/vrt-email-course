var wdio = require("webdriverio");

var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

var browser = wdio.remote(options);

require('webdrivercss').init(browser, {
  screenWidth: [320,480,640,1024]
});

var loginForm = {
  name: "Login",
  selector: "form.login"
};

browser
  .url("http://mysite.com/login")
  .webdrivercss("Login Default", loginForm)
  .setValue(".login .username", "admin")
  .webdrivercss("Login Username", loginForm)
  .setValue(".login .password", "badpassword")
  .submitForm(loginForm.selector)
  .webdrivercss("Login Error Message", loginForm)
  .isVisible(".alert.error")
  .then(function(isErrorVisible) {
    console.log("Is error message visible?", isErrorVisible);
    // Should print "Is error message visible? True"
  })
  .setValue(".login .password", "hunter2")
  .webdrivercss("Login Username Password", loginForm);