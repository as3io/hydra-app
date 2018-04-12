import Controller from '@ember/controller';

export default Controller.extend({
  role: 'Member',
  roles: null,

  init() {
    this.set('roles', ['Owner', 'Administrator', 'Member']);
    this._super(...arguments);
  }
});
