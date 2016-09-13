'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, SweetAlert, $filter) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.SweetAlert = SweetAlert;
    this.$filter = $filter;
  }

  delete(user) {
    this.SweetAlert.swal({
      title: this.$filter('translate')('CONFIRMATION'),
      text: this.$filter('translate')('USER_WARNING'),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this.$filter('translate')('DELETE_AGREE'),
      cancelButtonText: this.$filter('translate')('CANCEL'),
      closeOnConfirm: false
    }, (isConfirmed) => {
      if(isConfirmed) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
        swal(this.$filter('translate')('DELETED'), this.$filter('translate')('ACCOUNT_DELETED'), "success");
      }
    });
  }
}
