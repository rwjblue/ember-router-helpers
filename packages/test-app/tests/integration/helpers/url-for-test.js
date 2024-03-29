import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:url-for', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // eslint-disable-next-line ember/no-private-routing-service
    this.owner.lookup('router:main').setupRouter();
  });

  test('it can generate simple urls', async function (assert) {
    await render(hbs`{{url-for 'parent.child'}}`);

    assert.dom(this.element).hasText('/child');
  });

  test('it can generate urls with query params', async function (assert) {
    // legacy query-params helper replacement
    // https://deprecations.emberjs.com/v3.x#toc_ember-glimmer-link-to-positional-arguments
    // `(query-params foo="bar")`
    this.set('queryParams', {
      isQueryParams: true,
      values: {
        foo: 'bar',
      },
    });
    await render(hbs`{{url-for 'parent.child' this.queryParams}}`);

    assert.dom(this.element).hasText('/child?foo=bar');
  });
});
