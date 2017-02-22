'use strict';

describe('Component: MonitoringComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.admin.monitoring'));

  var MonitoringComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MonitoringComponent = $componentController('monitoring', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
