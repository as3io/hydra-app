import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  flashMessages: inject(),
  session: inject(),

  model({ token, dest }) {
    const successMessage = dest === 'settings' ? 'Your account has been verified. Please set a password.' : 'Your account has been verified.';
    return this.get('session').authenticate('authenticator:token', { token })
      .then(() => this.get('flashMessages').success(successMessage))
      .then(() => this.get('user').load())
      .catch(e => this.get('errorProcessor').show(e))
      .finally(() => this.transitionTo(dest))
  }
});
