/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
*/

$(function () {
  
  describe('RSS Feeds', function () {

    /* 
     * Test to make sure that the allFeeds 
     * variable has been defined and that it is not
     * empty. 
    */

    it('feeds are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* 
     * Loop through each feed in the allFeeds
     * object and ensure it has a URL defined
     * and that the URL is not empty.
    */

    it('url defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* 
     * Loop through each feed in the allFeeds 
     * object and ensures it has a name defined
     * and that the name is not empty.
    */

    it('name defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  describe('The Menu', function () {

    /* 
     * Ensures the menu element is hidden by default. 
    */

    var body = $('body'),
      menuIcon = $('.menu-icon-link');

    it('default hidden', function () {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* 
     * Ensures the menu changes visibility when
     * the menu icon is clicked.
    */

    //check class when state is true/false
    it('display and hide on click', function () {

      // Simulate a click on the menu item.
      menuIcon.click();
      // Expect the menu class to be gone
      expect(body.hasClass('menu-hidden')).toBe(false);

      // Simulate a click on the menu item again.
      menuIcon.click();
      // Expect the menu to have class 'menu-hidden' again
      expect(body.hasClass('menu-hidden')).toBe(true);

    });
  });

  describe('Initial Entries', function () {

    /* 
     * Check that when the LoadFeed function is 
     * called and completes its work, there is at least
     * a single .entry element within the .feed container.
    */

    //wait for loadFeed() to run
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('in feed container', function() {
      //get feed container elements
      var feedEntry = $('.feed .entry');
      
      //is there at least one entry?
      expect(feedEntry.length).toBeGreaterThan(0);
    });
  });


  describe("New Feed Selection", function() {

    /* 
     * Ensures that when a new feed is loaded,
     * the content actually changes
    */

    //declare variables to hold contents of feed
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
      expect(contents1).not.toBe(contents2);

    });
  });

});
