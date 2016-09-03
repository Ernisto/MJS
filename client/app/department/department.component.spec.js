'use strict';

describe('Component: DepartmentComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.department'));

  var DepartmentComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DepartmentComponent = $componentController('department', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
