import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  user: inject(),

  classNames: ['card', 'mb-5'],
  organization: null,
  isConfigurationOpen: false,

  canConfigure: computed.or('user.{isOwner,isAdmin}'),

  actions: {
    displayConfiguration() {
      this.set('isConfigurationOpen', true);
    },
  }


});
