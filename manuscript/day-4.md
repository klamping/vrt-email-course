# Take Action with WebdriverIO Commands

Yesterday we took a look at using WebdriverCSS to capture screenshots of our page. This is the root of visual regression testing and adds a valuable tactic to our regression testing toolbox.

Today, we're going to take regression testing one step further. Actually, we're going to take it several steps further by adding "steps" to our tests.

Websites aren't static. When you visit one, you're taking all sorts of actions. You're clicking buttons, entering text, dragging boxes around. There's a lot to do!

So far though, our tests haven't done much. We've simply loaded our page, checked a title, and taken a few screenshots. What about our dropdown menus? What about form fields? Certainly we can test those things as well!

Not only that, we can then take another set of screenshots after those actions are completed for a second round of visual tests, capturing the dynamic aspects of your site.

Here's what our tests for the main navigation on our page could look like:

1. Load the page
2. Screenshot the main nav (default state)
3. Open the main nav
2. Screenshot the main nav (open state)
3. Click a main nav link
4. New page loads automatically
5. Screenshot the main nav (active state)

We've already covered steps 1 and 2, so let's look at the remaining steps.

## Clicking around

Just like our previous actions, we're going to use a WebdriverIO command to click the element we want. And just like with WebdriverCSS, we'll pass in a CSS selector to specify the element we want to click:

```js
var menuIcon = {
    name: "Menu Icon",
    elem: ".menu "
};

browser
    .init()
    .url("http://outdatedbrowser.com/en")
    .webdrivercss("Main Menu Icon", menuIcon)
    .click(menuIcon.elem)
    .end();
```

This works almost exactly the same as an actual left click with your mouse. That's the beauty of Selenium. It's as if you took the action yourself!

### Capturing the opened menu

Now that we've clicked the nav, it should be open. Let's add another WebdriverCSS test to capture the opened menu:

```js

var menuIcon = {...};

var menu = {
    name: "Menu",
    elem: ".main_menu"
};

browser
    .init()
    .url("http://outdatedbrowser.com/en")
    .webdrivercss("Main Menu Menu Icon", menuIcon)
    .click(menuIcon.elem)
    .webdrivercss("Main Menu Open", menu)
    .end();
```

Look at that! You now have a visual regression test for two states of your navigation. You could easily take this further if you have more than one level in your navigation hierarchy (hello, mega dropdowns!)

### Result of clicking on navigation item

For our needs, we want to see what the page looks like after clicking a menu item and loading the new page. WebdriverIO automatically waits for the page to load after the click, so it's a pretty simple addition to our test:

```js
var menuIcon = {...};
var menu = {...};

var projectLink = mainNav.elem + " a[href$=project]";

browser
    .init()
    .url("http://outdatedbrowser.com/en")
    .webdrivercss("Main Menu Menu Icon", menuIcon)
    .click(menuIcon.elem)
    .webdrivercss("Main Menu Open", menu)
    .click(projectLink)
    // WebdriverIO will wait here until the "Project" page loads
    .click(menuIcon.elem)
    .webdrivercss("Main Menu - Projects Page", menu)
    .getUrl()
    .then(function(url) {
        console.log(url);
        // outputs:
        // http://outdatedbrowser.com/en/project
    })
    .end();
```

We threw in the `getUrl` command just to validate that we're on the right page. We also could have checked the page title using `getTitle` to verify that way.

You may also notice that we used an attribute selector to find the "Projects" link. Not only does WebdriverIO have strong support for CSS selectors, but it also supports xPath and "Link text" selectors. Check out [their selectors page](http://webdriver.io/guide/usage/selectors.html) for more information.

## More Actions

There really are a fantastic number of actions you can take. Let's preview a few of them by testing a login form!

### Entering Text in a Form

Say you want to test the login form on your site. You can grab a screenshot of the form fairly easily:

```js
var loginForm = {
    name: "Login Form",
    elem: ".login-form"
};

browser
    .init()
    .url("https://codepen.io/login")
    .webdrivercss("Login Default", loginForm)
    .end();
```

Then, you can set the text of the username using [the `setValue` command](http://webdriver.io/api/action/setValue.html):

```js

var loginForm = {...};

var username = loginForm.elem + " #login-email-field";

browser
    .init()
    .url("https://codepen.io/login")
    .webdrivercss("Login Default", loginForm)
    .setValue(username, "admin")
    .end();
```

Why not take a screenshot of this state?

```js
browser
    .init()
    .url("https://codepen.io/login")
    .webdrivercss("Login Default", loginForm)
    .setValue(username, "admin")
    .webdrivercss("Login w/Username", loginForm)
    .end();
```

It's important to note here that `setValue` only works with form elements like text input fields.

Let's repeat that with the password:

```js

var loginForm = {...};
var username = {...};

var password = loginForm.elem + " #login-password-field_";

browser
    .init()
    .url("https://codepen.io/login")
    .webdrivercss("Login Default", loginForm)
    .setValue(username, "admin")
    .webdrivercss("Login Username", loginForm)
    .setValue(password, "hunter2")
    .webdrivercss("Login Username Password", loginForm)
    .end();
```

### Submitting Forms

You could submit the form by running `.click` on the submit button, or you can use [the `submitForm` command](http://webdriver.io/api/action/submitForm.html):

```js
var loginForm = {
    name: "Login",
    elem: ".login-form"
};

browser
    ... test code here ...
    .submitForm(loginForm.elem)
```

### Looking for Elements

Most forms will show an error if the wrong username or password was used. We can test for the visibility of the error element using [the `isVisible` command](http://webdriver.io/api/state/isVisible.html) (WebdriverCSS calls removed for brevity):

```js

var loginForm = {...};
var username = {...};
var password = ...;

var error = ".error-message";

browser
    .init()
    .url("https://codepen.io/login")
    .setValue(username, "admin")
    .setValue(password, "badpassword")
    .submitForm(loginForm.elem)
    .isVisible(error)
    .then(function(isErrorVisible) {
        console.log("Is error message visible?", isErrorVisible);
        // Should print "Is error message visible? True"
    })
    .end();
```

This works much the same way the `getTitle` command shown in Day 2 works. The value of `isVisible` is passed to the `then` command, which we can use to display our result.

## The Full Tests

That sure was a lot, huh? Be sure to check out [the code samples](http://learn.visualregressiontesting.com/code-samples.zip) for Day 4 to see the entirety of the navigation and login tests.

## Finishing up

Did you catch all that? We just put a lot of pieces together to make two useful tests. You can easily expand on this to add even more depth to your tests.

Tomorrow, we're going to take a look at how to make catching failures a little less manual. Until then, write some in-depth tests on your own!
