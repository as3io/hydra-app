import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  username: null,
  password: null,
  errorMessage: null,
  session: inject(),

  showPassword: false,

  actions: {

    magicLogin() {
      const email = this.get('username');
      return this.get('user').initiateMagicLogin(email)
        .then(() => this.get('flashMessages').info('Please check your email to continue.'))
        .catch(e => this.get('errorProcessor').show(e))
    },
    authenticate() {
      this.set('errorMessage', null);
      let { username, password } = this.getProperties('username', 'password');
      this.get('session')
        .authenticate('authenticator:application', username, password)
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
    togglePassword() {
      this.set('showPassword', !this.get('showPassword'));
    },
  }
});
