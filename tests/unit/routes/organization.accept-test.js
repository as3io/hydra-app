import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | organization.accept', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:organization.accept');
    assert.ok(route);
  });
});
