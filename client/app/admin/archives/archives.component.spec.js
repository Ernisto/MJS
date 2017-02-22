'use strict';

describe('Component: ArchivesComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.admin.archives'));

  var ArchivesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ArchivesComponent = $componentController('archives', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
