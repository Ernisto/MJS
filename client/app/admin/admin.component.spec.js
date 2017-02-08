'use strict';

describe('Component: AdminComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.admin'));

  var AdminComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdminComponent = $componentController('admin', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
