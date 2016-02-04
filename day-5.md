Failure is an option

So far, we've been doing our fair share of manual work when running the tests. Every time we execute our test suite, we have to check the screenshots folder for diffs and read the console logs to verify the right messages.

In our attempt to automate our work, we're not really automated it. Thankfully, we can steal a trick from the unit testing book and use a technique called "assertions".

Assertions are a way to programmatically validate an expectation. They're a way to say "x should equal y" or the opposite: "x should not equal y". 



What are assertions
loading the node `assert` interface
Asserting the title
Asserting screenshots
 - Link to assertion function for webdrivercss
Asserting element exists
