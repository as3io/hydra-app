import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | organization.create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:organization.create');
    assert.ok(route);
  });
});
