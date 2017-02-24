'use strict';
const angular = require('angular');
import 'datatables.net';
import 'datatables.net-bs';

export default angular.module('mjsApp.datatable', [])
  .directive('datatable', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        dtData: '=',
        dtConfig: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('dtData', function (newValue) {
          if (newValue) {
            $timeout(() => {

              var table = $(element).DataTable(scope.dtConfig);

              table.columns().every( function () {
                var that = this;

                $( 'input', this.footer() ).on( 'keyup change', function () {
                  if ( that.search() !== this.value ) {
                    that
                      .search( this.value )
                      .draw();
                  }
                } );
              } );

            });

            /** For debugging purpose compare quantity of tr's in tbody with array length **/
            // console.log($(element).children('tbody').children('tr').length);
          }
        });
      }
    };
  })
  .name;
