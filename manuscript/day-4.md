Yesterday we took a look at using WebdriverCSS to capture screenshots of our page. This is the root of visual regression testing and adds a valuable tactic to our regression testing toolbox.

Today, we're going to take regression testing one step further. Actually, we're going to take it several steps further by adding "steps" to our tests.

Websites aren't static. When you visit one, you're taking all sorts of actions. You're clicking buttons, entering text, dragging boxes around. There's a lot to do!

So far though, our tests haven't done much. We've simply loaded our page, checked a title, and taken a few screenshots. What about our dropdown menus? What about form fields? Certainly we can test those things as well!

We can! Not only that, we also take another set of screenshots after those actions for another level of visual tests. Here's what our tests for the main navigation on our page could look like:

1. Load the page
2. Screenshot the main nav (default state)
3. Open the main nav dropdown
2. Screenshot the main nav (open state)
3. Click a main nav link
4. New page loads automatically
5. Screenshot the main nav (active state)

We've already covered steps 1 and 2, so let's get started with the rest.

### Clicking around

Just like our previous actions, we're going to use a WebdriverIO command to click the element we want. And just like with WebdriverCSS, we'll pass in a CSS selector to specify the element we want to click:

```js
browser
    .click(".main-nav")
```

This works almost exactly the same as a left click with your mouse button. That's the beauty of Selenium. It's as if you took the action yourself!

Now that we've clicked the nav, it should be open. Let's add another WebdriverCSS test for this state:

```js
var mainNav = {
    name: "Main Nav",
    selector: ".main-nav"
};

browser
    .webdrivercss("Main Nav Default", mainNav)
    .click(mainNav.selector)
    .webdrivercss("Main Nav Open", mainNav)
```

Look at that! You now have a visual regression test for two states of your navigation. You could easily take this further if you have more than one level in your navigation hierarchy (hello, mega dropdowns!)

For our needs, we want to see what the page looks like after clicking a menu item. WebdriverIO automatically waits for the page to load after the click, so it's a pretty simple addition to our test:

```js
var mainNav = {
    name: "Main Nav",
    selector: ".main-nav"
};
var aboutSelector = mainNav.selector + " .about";

browser
    .webdrivercss("Main Nav Default", mainNav)
    .click(mainNav.selector)
    .webdrivercss("Main Nav Open", mainNav)
    .click(aboutSelector)
    // WebdriverIO will wait here until the "About" page loads
    .webdrivercss("Main Nav - About Page", mainNav)
    .getUrl()
    .then(function(url) {
        console.log(url);
        // outputs something like:
        // "http://mysite.com/about"
    });
```

We threw in the `getUrl` command just to validate that we're on the right page. We also could have checked the page title using `getTitle` to verify that way.

### More Actions

There really are a fantastic number of actions you can take. Let's preview a few of them by testing a login form!

#### Entering Text in a Form

Say you want to test the login form on your site. You can grab a screenshot of the form fairly easily:

```js
var loginForm = {
    name: "Login",
    selector: "form.login"
};

browser
    .webdrivercss("Login Default", loginForm)
```

Then, you can set the text of the username using [the `setValue` command](http://webdriver.io/api/action/setValue.html):

```js
var usernameSelector = loginForm.selector + " .username";

browser
    .webdrivercss("Login Default", loginForm)
    .setValue(usernameSelector, "admin")
```

Why not take a screenshot of this state?

```js
browser
    .webdrivercss("Login Default", loginForm)
    .setValue(usernameSelector, "admin")
    .webdrivercss("Login w/Username", loginForm)
```

It's important to note here that `setValue` only works with "interactable" elements

Let's repeat that with the password:

```js
var passwordSelector = loginForm.selector + " .password";

browser
    .webdrivercss("Login Default", loginForm)
    .setValue(usernameSelector, "admin")
    .webdrivercss("Login Username", loginForm)
    .setValue(passwordSelector, "hunter2")
    .webdrivercss("Login Username Password", loginForm)
```

#### Submitting Forms

You could submit the form by running `.click` on the submit button, or you can use [the `submitForm` command](http://webdriver.io/api/action/submitForm.html):

```js
var loginForm = {
    name: "Login",
    selector: "form.login"
};

browser
    ... test code here ...
    .submitForm(loginForm.selector)
```

#### Looking for Elements

Most forms will show an error if the wrong username or password was used. We can test for the visibility of the error element using [the `isVisible` command](http://webdriver.io/api/state/isVisible.html) (webdrivercss calls removed for brevity):

```js
var errorSelector = ".alert.error";

browser
    .setValue(usernameSelector, "admin")
    .setValue(passwordSelector, "badpassword")
    .submitForm(loginForm.selector)
    .isVisible(errorSelector)
    .then(function(isErrorVisible) {
        console.log("Is error message visible?", isErrorVisible);
        // Should print "Is error message visible? True"
    })
```

This works much the same way the `getTitle` command shown in Day 2 works. The value of `isVisible` is passed to the `then` command, which we can use to display our result.

## The Full Tests

That sure was a lot, huh? Be sure to check out [the Day 4 code samples]() to see the entirety of the navigation and login tests. 

## Finishing up

Did you catch all that? We just put a lot of pieces together to make two useful tests. You can easily expand on this to round out your tests with even more depth.

Tomorrow, we're going to take a look at how to make catching failures a little less manual. Until then, write some in-depth tests on your own!


*If you enjoyed these lessons, consider sharing this course with your friends*
