import Component from '@ember/component';
import { inject } from '@ember/service';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import mutation from 'hydra-app/gql/mutations/configure-organization';

export default Component.extend(ComponentQueryManager, {
  flashMessages: inject(),
  errorProcessor: inject(),

  organization: null,
  isModalOpen: false,

  name: null,
  description: null,
  photoURL: null,

  init() {
    this.set('photoURL', this.get('organization.photoURL'));
    this.set('name', this.get('organization.name'));
    this.set('description', this.get('organization.description'));
    this._super(...arguments);
  },

  actions: {
    saveConfiguration() {
      // this.showLoading();
      const organizationId = this.get('organization.id');
      const { photoURL, name, description } = this.getProperties([ 'photoURL', 'name', 'description' ]);
      const input = { organizationId, photoURL, name, description };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'configure-organization')
        .then(() => {
          this.set('isModalOpen', false);
          this.get('flashMessages').success('Organization updated successfully.');
        })
        .catch(e => this.get('errorProcessor').show(e))
        // .finally(() => this.hideLoading())
      ;
    },
  },

});
