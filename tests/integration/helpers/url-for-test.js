import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:url-for', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.setupRouter();
  });

  test('it can generate simple urls', async function (assert) {
    await render(hbs`{{url-for 'parent.child'}}`);

    assert.dom(this.element).hasText('/child');
  });

  test('it can generate urls with query params', async function (assert) {
    await render(hbs`{{url-for 'parent.child' (query-params foo="bar")}}`);

    assert.dom(this.element).hasText('/child?foo=bar');
  });
});
