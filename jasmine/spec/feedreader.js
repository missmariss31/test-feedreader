/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?  Answer: 1 failure, Error: Expected 0 not to be 0.
     */
    it('feeds are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('url defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('name defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });


  });


  /* TODO: Write a new test suite named "The menu" */

  describe('The Menu', function () {

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    var body = $('body'),
      menuIcon = $('.menu-icon-link');

    it('default hidden', function () {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    // TODO: Check the class of the menu item after it's been clicked


    //check class when state is true/false
    it('display and hide on click', function () {
      // TODO: Simulate a click on the menu item.
      menuIcon.click();
      // Expect the menu class to be gone
      expect(body.hasClass('menu-hidden')).toBe(false);

      menuIcon.click();

      // Expect the menu class to be gone
      expect(body.hasClass('menu-hidden')).toBe(true);

    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */

  describe('Initial Entries', function () {

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    //wait for loadFeed() to run
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('in feed container', function() {
      //get feed container elements
      var feedEntry = $('.feed').children();
      //is there at least one entry?
      expect(feedEntry.length).toBeGreaterThan(0);
    });

  });

  /* TODO: Write a new test suite named "New Feed Selection" */

  describe("New Feed Selection", function() {
    /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */

    //declare variables to hold contents
    let contents1,
        contents2;

    //wait for loadFeed() to run and record contents
    beforeEach(function(done) {
      loadFeed(1, function() {
        contents2 = $('h2').text();
        loadFeed(0, function() {
          contents1 = $('h2').text();
          done();
        });
      });
    });

    it("content changes", function() {
      //check content against previous content
      console.log(contents1);
      console.log(contents2);
      expect(contents1).not.toBe(contents2);

    });

  });

  

});
