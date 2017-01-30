# Advanced WebdriverCSS Usage

As you advance in your test writing capabilities, you'll find yourself in situations where a plain ol' screenshot just won't work. Maybe you need to test all images in three different resolutions, or you need to hide some text because it's always changing. 

Good news, WebdriverCSS has you covered.

## Customize the setup

When we first set up WebdriverCSS, we glossed over the fact that you can customize some global options it has. 

When initializing WebdriverCSS, our command usually looks like:

```js
require('webdrivercss').init(browser);
```

There's a second argument we can pass in to that 'init' call; an configuration object which defines these aspects of our screenshots:

- `screenshotRoot`
	- By default, screenshots are all saved to the './webdrivercss' folder. By passing in a custom path, we can change where all the baseline screenshots are saved.  
- `failedComparisonsRoot`
	- Similar to `screenshotRoot`, this option defines where to store the 'diff' images. It defaults to `./webdrivercss/diff`.
- `misMatchTolerance`
	- A number between 0 and 100 (default is 0.05) that defines the degree of mismatch to consider two images as identical. Increase the number to be less strict in comparisons; decrease to define smaller difference limits.
- `screenWidth` Numbers[] ( default: [] )
	- When defined, will cause every capture to be taken in the different screen widths requested
- `updateBaseline`
	- Set this to true to automatically update the baseline images with the latest capture. Useful for when you make an update to your design and want to redefine the images.

Here's what these options would look like in regular use:

```js
require('webdrivercss').init(browser, {
    // example options
    screenshotRoot: 'my-shots',
    failedComparisonsRoot: 'diffs',
    misMatchTolerance: 0.05,
    screenWidth: [320,480,640,1024],
    updateBaseline: true
});
```

## Customize a screenshot

In our previous usage of the WebdriverCSS command, we showed example code but didn't go on to detail on the function itself. Let's do that now!

The `webdrivercss` function takes 3 different parameters:

1. __An ID__: Each WebdriverCSS test needs to have a unique ID. This value will be the prefix for all of the screenshot file names, and should therefore follow traditional naming conventions like no spaces, dashes, or special characters.
2. __Options__: an array of option objects, each one representing a different part of the page that you would like to test. Properties in the objects include:
  1. __name__: Name of the captured element
  2. __elem__: Selector of the element you want to capture
  3. __width__: You can specify a fixed width for your screenshot
  4. __height__: You can specify a fixed height for your screenshot
  5. __x__: You can specify a fixed x coordinate for your screenshot (requires width/height)
  6. __y__: You can specify a fixed y coordinate for your screenshot (requires width/height)
  7. __screenWidth__: Pass through an array of screen widths to test this element at
  8. Various other [properties to hide, remove or exclude](https://github.com/webdriverio/webdrivercss/tree/beta-rc1#usage) parts of the page, which can be useful in order to ignore dynamic components such as advertisements. We'll talk about these in a moment.
3. __The Callback__: This function answers the "Ok I've got all of these images, what do I do now"? We'll leave it alone, but [you can customize it gain information on the status of your screenshot comparisons](https://github.com/webdriverio/webdrivercss#let-your-test-fail-when-screenshots-differ).

Here's what a fully customized capture could look like:

```js
webdrivercss('startpage',[
    {
        name: 'header',
        elem: '#header'
    }, {
        name: 'hero',
        elem: '#hero'
    }, {
        name: 'headerbar',
        x: 110,
        y: 15,
        width: 980,
        height: 34,
        screenWidth: [1200]
    }
])
```

[You can peruse through all the options via the documentation](https://github.com/webdriverio/webdrivercss#usage).

## Excluding, hiding and removing

We mentioned the ability to hide content, but didn't show you an example. That's because it deserves its own shoutout. 

Sometimes it is unavoidable that content constantly changes inside of a screenshot. This would break all your tests, all the time.

To prevent this you can determine areas, which will either be excluded, hidden or removed.  

- Excluded
	- This will cause the area or element defined to be covered in black
- Hidden
	- This will cause the element defined to have 'visibility: hidden' applied to it. It will still take up space on the page, only being invisible.
- Removed
	- Uses 'display: none' to remove the defined element from the page, as if the element didn't exist on the page at all.

Wanna see what that looks like? Of course you do!

```js
.webdrivercss('header', {
    name: 'header',
    elem: '#header',
    exclude: ['#leaderboard-ad', '#mini-ad'],
    hide: '.username',
    remove: '#date'
});
```

## Managing Baseline images

This is the last thing we'll talk about today.

If you're using a version control system like Git, we recommend storing baseline images in it like any other file (although you may want to [use a `.gitignore` file](https://github.com/webdriverio/webdrivercss/blob/master/examples/.gitignore) to skip the `.regression.` and `diff` images). This makes it simple to share baseline images across teams. It also allows for changes in the baseline to be tracked over time and viewed in pull requests.

Be aware that if team members or testing platforms are not using the same OS, the baseline images might differ slightly. A common example is that a baseline will work for local testing on OSX, but the same baseline image fails when TravisCI runs the same visual regression test since it is Linux-based.

## Updating baseline images

Eventually our design is going to change, and when it does, we need to make sure that our new baseline images accompany our style changes.

If we increase the font size of our main header, our commit should include not just the new css, but the new baseline file as well. The reason for this is so that the next person that downloads our new CSS will also have a baseline image of our header with that larger text.