import Controller from '@ember/controller';
import { inject } from '@ember/service';

import mutation from 'hydra-app/gql/mutations/create-user';

export default Controller.extend({
  session: inject(),
  apollo: inject(),
  flashMessages: inject(),

  email: null,
  givenName: null,
  familyName: null,
  errorMessage: null,

  actions: {
    signup() {
      const { email, givenName, familyName } = this.getProperties('email', 'givenName', 'familyName');
      const variables = { input: { payload: { email, givenName, familyName } } };
      const resultKey = 'createUser';
      const successMessage = 'Your account has been created and a verification email has been sent. Please check your email to continue.';
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(() => this.get('flashMessages').info(successMessage, { sticky: true }))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
});
