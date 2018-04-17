import Service from '@ember/service';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import currentUser from 'hydra-app/gql/queries/current-user';
import mutation from 'hydra-app/gql/mutations/magic-login';

export default Service.extend({
  apollo: inject(),
  session: inject(),

  model: null,

  selectedOrg: null,

  // Allow storing/retreiving org/proj id from ls?
  organizations: computed.reads('model.organizations'),
  organization: computed('model.organizations', 'selectedOrg', function() {
    try {
      const { id } = JSON.parse(localStorage.getItem('selectedOrg'));
      if (id) {
        const org = this.get('organizations').findBy('id', id);
        if (org) return org;
      }
    } catch (e) {
      // noop
    }
    return this.get('model.organizations.firstObject');
  }),
  projects: computed.reads('organization.projects'),
  project: computed.reads('projects.firstObject'),

  hasPassword: computed.reads('model.hasPassword'),

  initiateMagicLogin(email) {
    const variables = { input: { email } };
    return this.get('apollo').mutate({ mutation, variables })
  },

  setOrg({ id }) {
    localStorage.setItem('selectedOrg', JSON.stringify({ id }));
    this.set('selectedOrg', { id });
  },

  load() {
    return new Promise((resolve) => {
      const userId = this.get('session.data.authenticated.id');
      if (isEmpty(userId)) return resolve();

      return this.get('apollo').watchQuery({ query: currentUser }, 'currentUser')
        .then(user => this.set('model', user))
        .then(() => resolve())
      ;
    });
  },

  logout() {
    // const loader = this.get('loader');
    // loader.show();
    return this.get('session').invalidate()
      // .finally(loader.hide())
    ;
  }
});
