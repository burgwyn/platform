Router.route('/users', {
  name: 'accountsAdmin',
  layout: 'masterLayout',
  template: 'accountsAdmin',
});

Router.route('/verify-email/:token',{
  name: 'verify-email',
  action: function() {
    Accounts.verifyEmail( this.params.token, () => {
      Router.go( '/' );
      sAlert.success( 'Email verified! Thanks!');
    });
  }
});

Router.route('/settings/account', {
  name: 'account',
  layout: 'masterLayout',
  template: 'account',
});

Router.route('/settings/profile', {
  name: 'profile',
  layout: 'masterLayout',
  template: 'profile',
});

Router.route('/sign-out', {
  name: 'signOut',
  layout: 'masterLayout',
  template: 'signOut',
});

const signOut = function () {
  Meteor.logout(function () {});
  this.redirect('/');
  return this.next();
};

Router.onBeforeAction(signOut, { only: ['signOut'] });
