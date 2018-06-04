import Component from '@ember/component';
import { computed } from '@ember/object';
import LoadingMixin from 'hydra-app/mixins/loading-mixin';

export default Component.extend(LoadingMixin, {
  classNames: ['loading'],
  show: computed.readOnly('loadingDisplay.isShowing'),
});
