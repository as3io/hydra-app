import Controller from '@ember/controller';
import { inject } from '@ember/service';

import mutation from 'hydra-app/gql/mutations/send-password-reset';

export default Controller.extend({
  session: inject(),
  apollo: inject(),
  flashMessages: inject(),

  email: null,
  errorMessage: null,

  actions: {
    reset() {
      const email = this.get('email');
      const variables = { input: { email } };
      const resultKey = 'sendPasswordReset';
      const successMessage = 'A verification email has been sent. Please check your email to continue.';
      const refetchQueries = ['currentUser'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('flashMessages').info(successMessage, { sticky: true }))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
});
