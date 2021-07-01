import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest, setupApplicationTest } from 'ember-qunit';
import { render, settled, visit, waitFor } from '@ember/test-helpers';
import EmberRouter from '@ember/routing/router';
import Route from '@ember/routing/route';
import hbs from 'htmlbars-inline-precompile';
import { defer } from '../../helpers';

class RouterServiceMock extends Service {
  @tracked currentURL;

  get currentRouteName() {
    return this.currentURL.substring(1);
  }

  isActive(routeName) {
    return this.currentRouteName === routeName;
  }
}

module('helper:is-active', function () {
  module('rendering', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.owner.register('service:router', RouterServiceMock);
    });

    test('it renders and rerenders when currentURL changes', async function (assert) {
      const router = this.owner.lookup('service:router');

      router.set('currentURL', '/foo');
      this.set('targetRoute', 'bar');
      await render(hbs`{{is-active this.targetRoute}}`);

      assert
        .dom(this.element)
        .hasText(
          'false',
          'is-active is not true when curren route is different from target route'
        );

      router.set('currentURL', '/bar');

      await settled();

      assert
        .dom(this.element)
        .hasText('true', 'is-active is true now when URL has changed');

      router.set('currentURL', '/foo');

      await settled();

      assert
        .dom(this.element)
        .hasText('false', 'is-active is false when curren route has changed');
    });
  });

  module('routing', function (hooks) {
    setupApplicationTest(hooks);

    hooks.beforeEach(function () {
      class Router extends EmberRouter {}
      Router.map(function () {
        this.route('foo');
        this.route('bar');
      });

      this.owner.register('router:main', Router);
      this.owner.register(
        'template:application',
        hbs`{{is-active 'foo'}}{{outlet}}`
      );
    });

    test('it updates when currentURL changes', async function (assert) {
      await visit('/');

      assert
        .dom(this.element)
        .hasText(
          'false',
          'is-active is not true when curren route is different from target route'
        );

      await visit('/foo');

      assert
        .dom(this.element)
        .hasText('true', 'is-active is true now when URL has changed');

      await visit('/');

      assert
        .dom(this.element)
        .hasText('false', 'is-active is false when curren route has changed');
    });

    test('it renders and rerenders when the URL changes into and out of loading substate', async function (assert) {
      let slowModelDeferred = defer();

      this.owner.register(
        'route:foo',
        class extends Route {
          model() {
            return slowModelDeferred.promise;
          }
        }
      );
      this.owner.register(
        'template:foo-loading',
        hbs`<div class="loading-spinner"></div>`
      );

      await visit('/');

      assert
        .dom(this.element)
        .hasText(
          'false',
          'precond - is-active is not true when on index route'
        );

      let visitPromise = visit('/foo');

      await waitFor('.loading-spinner');

      assert
        .dom(this.element)
        .hasText('false', 'is-active is not true when on the loading substate');

      slowModelDeferred.resolve();

      await visitPromise;

      assert
        .dom(this.element)
        .hasText(
          'true',
          'is-active is true now that model hook has fully resolved'
        );
    });
  });
});
