Yesterday we took a look at using WebdriverCSS to capture screenshots of our page. This is the root of visual regression testing and adds a valuable tactic to our regression testing toolbox.

Today, we're going to take regression testing one step further. Actually, we're going to take it several steps further, by adding "steps" to our tests.

Websites aren't static. When you visit one, you're taking all sorts of actions. You're clicking buttons, entering text, dragging boxes around. There's a lot to do!

So far though, our tests haven't done much. We've simply loaded our page, checked a title, and taken a few screenshots. What about our dropdown menus? What about form fields? Certainly we can test those things.

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
	.click(".main-nav ")
```

### Find some elements

### Take a look

## The Full Test