'use strict';

describe('Component: adminFooter', function() {
  // load the component's module
  beforeEach(module('mjsApp.admin-footer'));

  var adminFooterComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    adminFooterComponent = $componentController('adminFooter', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
