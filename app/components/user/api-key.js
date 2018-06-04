import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  key: '',
  secret: '',

  onChange: null,

  actions: {
    generateApiKey() {
      this.onChange();
    }
  }

});
