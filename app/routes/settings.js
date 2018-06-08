import Route from '@ember/routing/route';
import { inject } from '@ember/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import SetPassword from 'hydra-app/gql/mutations/set-password';
import GenerateUserApiKey from 'hydra-app/gql/mutations/generate-user-api-key';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  flashMessages: inject(),

  actions: {
    setPassword(password) {
      const variables = { password };
      const resultKey = 'setPassword';
      const mutation = SetPassword;
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(() => this.get('flashMessages').success('Password changed.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
    generateKey() {
      if (!confirm('Are you sure?')) return;
      const variables = { };
      const resultKey = 'generateUserApiKey';
      const mutation = GenerateUserApiKey;
      return this.get('apollo').mutate({ mutation, refetchQueries: ['CurrentUser'] }, resultKey)
        .then(() => this.get('flashMessages').success('API Keys updated.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  },
});
