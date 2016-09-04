'use strict';

describe('Component: JournalComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.journal'));

  var JournalComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    JournalComponent = $componentController('journal', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
