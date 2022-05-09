import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | root-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns rootURL', async function (assert) {
    await render(hbs`{{root-url}}`);
    assert.equal(this.element.textContent.trim(), '/');
  });

  test('can be used to prefix any href', async function (assert) {
    await render(hbs`<a href="{{root-url}}profile">Profile</a>`);
    assert.equal(
      this.element.querySelector('a').getAttribute('href'),
      '/profile'
    );
  });
});
