/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function, since some of these tests may require DOM elements. We want to ensure they don't run until the DOM is ready. */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty. */
         it('Feed has URLs', function(){
           for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            }
         });

        /* Test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.  */
         it('Feed has Names', function(){
           for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /*New test suite named "The menu" */
    describe('The Menu', function() {
      /* Test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element. */
      let ReaderBody = $('body')[0];

       it('No Menu as Default', function(){
        // expect(ReaderBody).toHaveClass('menu-hidden');
        expect(ReaderBody.classList).toContain('menu-hidden');
       });


       /* Test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when  clicked and does it hide when clicked again.   */
        it('Menu on Click', function(){
          //first click
          menuLink = $('.menu-icon-link')[0];
          menuLink.click();
          expect(ReaderBody.classList).not.toContain('menu-hidden');

          //second click
          menuLink.click();
          expect(ReaderBody.classList).toContain('menu-hidden');
        });
    });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Remember, loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done() function. */
       beforeEach(function(done){
         loadFeed(0, function(){
             done();
           });
       });

       it('loadFeed works', function(done){
        let feedHTML = $('.feed')[0];
        expect(feedHTML.children.length).toBeGreaterThan(0);
        //FIX TO INCLUDE ENTRY
        done();
       });
    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
        let initialFeed;
        let newFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
              initialFeed = $('.feed').html();
              //console.log(initialFeed);

            loadFeed(1, function(){
                  done();
              });
            });
        });

        it('loadFeed changes', function(done){
          newFeed = $('.feed').html();
          //console.log(newFeed);
          expect(initialFeed).not.toEqual(newFeed);
          done();
        });
    });
}());
