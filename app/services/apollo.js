import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from 'apollo-link-context';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ApolloService.extend({
  /**
   * The current user sesion.
   */
  session: inject(),

  /**
   * Registers a link to authorize requests before fetch requests are made.
   */
  link: computed(function() {
    const httpLink = this._super(...arguments);
    const authLink = setContext((request, context) => {
      return this._runAuthorize(request, context);
    });
    return authLink.concat(httpLink);
  }),

  /**
   * Adds authorization headers to outgoing Graph API Fetch requests.
   * Will only be added if there is currently an authenticated session.
   * Note: this will NOT add auth headers to the `checkSession` query, as
   * the auth token is required as an input parameter in that case.
   */
  _runAuthorize() {
    if (!this.get('session.isAuthenticated')) {
      return {};
    }
    return new Promise(success => {
      const token = this.get('session.data.authenticated.token');
      const Authorization = `Bearer ${token}`;
      success({ headers: { Authorization } });
    });
  },
});
