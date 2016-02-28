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

var loginForm = {
    name: "Login",
    selector: ".login-form"
};
var usernameSelector = loginForm.selector + " #login-email-field";
var passwordSelector = loginForm.selector + " #login-password-field_";
var errorSelector = ".error-message";

browser
  .init()
  .url("https://codepen.io/login")
  .webdrivercss("Login Default", loginForm)
  .setValue(usernameSelector, "admin")
  .webdrivercss("Login Username", loginForm)
  .setValue(passwordSelector, "badpassword")
  .submitForm(loginForm.selector)
  .webdrivercss("Login Error Message", loginForm)
  .isVisible(errorSelector)
  .then(function(isErrorVisible) {
    console.log("Is error message visible?", isErrorVisible);
    // Should print "Is error message visible? True"
  })
  .end();