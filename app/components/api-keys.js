import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  user: inject(),

  classNames: ['card', 'mb-5'],

  model: null,

  isModalOpen: false,

  canConfigure: computed.or('user.{isOwner,isAdmin}'),

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
  }

});
