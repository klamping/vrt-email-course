# And... Action! Take Control with WebdriverIO Commands

Yesterday we learned to use WebdriverCSS for capturing screenshots of our page. Today, we're going to take things one step further. Scratch that. We're going to things several steps further by adding "steps" to our tests.

Websites aren't static. When you visit one, you're taking all sorts of actions. You're clicking buttons, entering text, dragging boxes around. There's a lot to do!

So far though, our tests haven't done much. We've simply loaded our page, checked a title, and taken a few screenshots. What about dynamic elements like dropdown menus and form fields? We should totally test those too!

For example, if we wanted to test the main navigation of the outdatedbrowser.com website, our steps would look something like this:

1. Load the page
2. Screenshot the menu icon
3. Click the menu icon (opening the nav)
4. Screenshot the menu
5. Click a main nav link (New page loads automatically)
6. Screenshot the menu icon

## Starting Off

We're testing a new page, so we need a new file. Let's fill it in with the basics:

```js
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

browser.url("http://outdatedbrowser.com")
  .webdrivercss("Hamburger Icon", [menuIcon])
  .end();
```

> Just a reminder to make sure your 'chromedriver' instance is running

So far there's nothing new. We've moved our WebdriverCSS selector to its own variable, and the reason why is coming up next!

## Clicking around

The navigation on outdatedbrowser.com is hidden by default behind a friendly hamburger icon. After haven taken a picture of this icon using WebdriverCSS, we should click it to open the menu.

To do this, we're going to use the 'click' command. And just like with the WebdriverCSS command, we'll pass in a CSS selector to specify the element we want to click:

```js
browser.url("http://outdatedbrowser.com/en")
    .webdrivercss("Main Menu Icon", menuIcon)
    .click(menuIcon.elem)
```

See why we needed that `menuIcon` variable? Since we're using the same selector for both WebdriverCSS and our `click` command, it's nice to keep it all in one variable.

FYI, `click` works almost exactly like an actual left click with your mouse. That's the beauty of Selenium; it's as if you took the action yourself!

### Capturing the opened menu

After clicking the menu icon, it takes a second to animate in. If we took the screenshot right away, we'd get some strange results. We're going to add another WebdriverCSS test to capture the opened menu, but before that we need to use the `pause` command to wait a second while the menu opens:

```js
var menuIcon = {...};
var menu = {
    name: "Menu",
    elem: ".main_menu"
};

browser
    ... previous actions ...
    .pause(1000)
    .webdrivercss("Main Menu - Open", menu)
```

The `pause` command takes a number of milliseconds to wait. Since we want to wait a second, we'll pass in the number 1000, or 1000 milliseconds.

Now look at that! We have a Visual Regression Test for a dynamic element that animates in. That's complicated stuff!

### Click a link

It would be good to know how the page looks after clicking a menu item and loading a new page. We'll use the 'click' command again to trigger a page load of the 'Project' menu item:

```js
browser
    ... previous actions ...
    .click("=THE PROJECT")
```

Notice anything different about this click command? In order to let WebdriverIO know which link we want, we passed in an equal sign plus the text of the link. 

Not only does WebdriverIO have strong support for CSS selectors, but it also supports text-based selectors as well. Check out [the selectors page](http://webdriver.io/guide/usage/selectors.html) for more information.

## Finishing up

Last thing; Now that we're on the Projects page, we should open the menu and capture the 'active' state of the project menu item. Even though we've loaded an entirely different webpage, WebdriverIO is smart enough to understand what's going on. We can write our test as one cohesive script:

    browser
    ... previous actions ...
    .click("=THE PROJECT")
    // WebdriverIO automatically waits here while the new page loads
    .webdrivercss("Main Menu Icon - Projects", menuIcon)
		.getUrl().then(function(url) {
		    console.log("Page url is: " + url);
		})
    end();

We threw the `getUrl` command in just to validate we're on the right page, although our menu screenshot should be validation enough.

## The Full Tests

That sure was a lot, huh? Be sure to check out [the code samples](http://learn.visualregressiontesting.com/code-samples.zip) for Day 4 to see it all together.

## Finishing up

Wow! We just pieced several parts together to make one very useful test. Hopefully you feel more empowered in your testing ability. Check out [the full WebdriverIO commands API](http://webdriver.io/api.html) to see everything you now have the power to do.

Tomorrow, we're looking at advanced WebdriverCSS usage. Until then, try writing some in-depth tests on your own!
