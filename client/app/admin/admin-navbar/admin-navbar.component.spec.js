'use strict';

describe('Component: adminNavbar', function() {
  // load the component's module
  beforeEach(module('mjsApp.admin-navbar'));

  var adminNavbarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    adminNavbarComponent = $componentController('adminNavbar', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
