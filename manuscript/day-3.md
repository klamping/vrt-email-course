# Real Visual Regression Testing with WebdriverCSS

It's Day 3! We've spent the past two days getting things in place. Today is the day we finally use WebdriverCSS!

## GraphicsMagick

So we need to install one more tool.

GraphicsMagick is software that performs image manipulation and comparison. It allows us to compare our images, and let us know when there are differences between the two.

To install it, [follow the instructions in the WebdriverCSS Readme](https://github.com/visualregressiontesting/webdrivercss#install). Be forewarned that you may need to  uninstall 'ImageMagick' if you have it installed. Yes, they're different software, and they don't always get along.

To test your installation, run `gm` from the command line. You should see a response that looks like:

```sh
GraphicsMagick 1.3.21 2015-02-28 Q8 http://www.GraphicsMagick.org/
Copyright (C) 2002-2014 GraphicsMagick Group.
Additional copyrights and licenses apply to this software.
See http://www.GraphicsMagick.org/www/Copyright.html for details.
Usage: gm command [options ...]
```

## Setting Up WebdriverCSS

Now that we have that installed, it's time to make some changes to our `tests.js` file. First, we load and initialize WebdriverCSS.

On a new line after your '.init(...)' code, add:

```js
require('webdrivercss').init(browser);
```

This appends the 'webdrivercss' command to our `browser` object.

## Writing our first Visual Regression Tests

Let's replace that almost useless 'getTitle' command with a much more useful 'webdrivercss' one:

```js
browser.url("https://learn.visualregressiontesting.com")
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
```

In our code, we're capturing two different elements on our homepage: the header and the benefits section.

The header doesn't change over different breakpoints, but the benefits section does. So to make sure we test each of those breakpoints we use the `screenWidth` parameter in the second set of options. This will produce a total of three images for the benefits element, one for each viewport size.

If you'd like to learn more about the options available to you, [check out the documentation](https://github.com/visualregressiontesting/webdrivercss#usage).

### Is your ChromeDriver Running?

Remember last email where we had you start ChromeDriver? Yeah, do that again:

```sh
./node_modules/.bin/chromedriver --url-base=/wd/hub --port=4444
```

### Run Our Tests

> If you need to catch up, or check your work, take a look at `day-3.js` in [the course code samples](http://learn.visualregressiontesting.com/code-samples.zip).

With ChromeDriver started, and WebdriverCSS ready to go, let's run our tests!

```sh
node tests.js
```

To see the results of our tests, open up the newly created `webdrivercss` folder. In this folder you'll see the following files:

```
homepage.320px.png
homepage.640px.png
homepage.1024px.png
homepage.png
homepage.benefits.320px.baseline.png
homepage.benefits.640px.baseline.png
homepage.benefits.1024px.baseline.png
homepage.header.baseline.png
```

The first four images listed (without `baseline` in their name) are the full page screenshots WebdriverCSS captures from Chrome. Once those images are captured, WebdriverCSS crops the image down to your specified areas giving you the four baseline images.

## Hey, that wasn't a test!

So you may have noticed that we didn't actually test anything. We only took some screenshots of a working page. It isn't until you run your tests with baseline images already there that you'll see a possible diff.

Normally this happens after you've done some edits to your page and want to make sure it's working right. For use, we're going to change the url of the page we testing, to simulate a "broken" update.

On the `browser.url` call, change the URL to include `/broke.html`:

```js
browser.url("https://learn.visualregressiontesting.com/broke.html")
```

## Seeing what's wrong

While the test still ran normally, if you check your `webdrivercss` folder, you may notice two things:

1. There are now `regression` versions of the images
2. The `diff` folder now contains four colorfully pink images.

The regressions are the 'next state' version of your image. It's useful to see the actual image that was captured.

The 'diff' images are a comparison of the `baseline` and `regression` images, highlighting in hot pink anything dissimilar between the two.

## I meant to change that...

If you ever want to recreate your baselines, simply delete the `webdrivercss` folder, run your tests again with your updates in place, and you'll have a new set of baselines for use.

## Up next

Snapping pictures of the initial page load is good, but what about dynamic content? In our next lesson, we'll learn some advanced features of WebdriverIO and see how to test interactive elements like mobile navigation and login forms.
