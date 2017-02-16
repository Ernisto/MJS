'use strict';

describe('Component: adminMainSidebar', function() {
  // load the component's module
  beforeEach(module('mjsApp.admin-main-sidebar'));

  var adminMainSidebarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    adminMainSidebarComponent = $componentController('adminMainSidebar', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
