import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | navigation', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /parent/child', async function(assert) {
    await visit('/');
    await click('[data-test-parent-child-link]');

    assert.equal(currentURL(), '/parent/child');
  });
});
