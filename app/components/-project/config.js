import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import mutation from 'hydra-app/gql/mutations/update-project';

export default Component.extend(ComponentQueryManager, {
  flashMessages: inject(),
  errorProcessor: inject(),

  project: null,
  organization: computed.reads('project.organization'),

  isModalOpen: false,

  name: null,
  description: null,

  init() {
    this.set('name', this.get('project.name'));
    this.set('description', this.get('project.description'));
    this._super(...arguments);
  },

  actions: {
    saveConfiguration() {
      const id = this.get('project.id');
      const { name, description } = this.getProperties([ 'name', 'description' ]);
      const input = { id, payload: { name, description } };
      const variables = { input };
      return this.get('apollo').mutate({ mutation, variables }, 'configure-project')
        .then(() => this.set('isModalOpen', false))
        .then(() => this.get('flashMessages').success('Project updated successfully.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});
