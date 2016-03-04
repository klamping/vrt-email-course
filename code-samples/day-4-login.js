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
    elem: ".login-form"
};
var username = loginForm.elem + " #login-email-field";
var password = loginForm.elem + " #login-password-field_";
var error = ".error-message";

browser
  .init()
  .url("https://codepen.io/login")
  .webdrivercss("Login Default", loginForm)
  .setValue(username, "admin")
  .webdrivercss("Login Username", loginForm)
  .setValue(password, "badpassword")
  .submitForm(loginForm.elem)
  .webdrivercss("Login Error Message", loginForm)
  .isVisible(error)
  .then(function(isErrorVisible) {
    console.log("Is error message visible?", isErrorVisible);
    // Should print "Is error message visible? True"
  })
  .end();