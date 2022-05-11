import { module, test } from 'qunit';
import { setupRenderingTest, setupApplicationTest } from 'ember-qunit';
import { click, render, visit, waitFor, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import RouteParamsHelper from 'ember-router-helpers/helpers/route-params';
import RouteParams from 'ember-router-helpers/utils/route-params';
import { defer } from '../../helpers';
import EmberRouter from '@ember/routing/router';
import Route from '@ember/routing/route';

module('helper:route-params', function () {
  module('rendering', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      // eslint-disable-next-line ember/no-private-routing-service
      this.owner.lookup('router:main').setupRouter();
    });

    test('route-params yields correct URL value', async function (assert) {
      await render(hbs`
      {{#let (route-params 'parent.child') as |routeParams|}}
        {{routeParams.url}}
      {{/let}}`);

      assert.strictEqual(this.element.textContent.trim(), '/child');
    });

    test('route-params yields correct URL value with query-params helper', async function (assert) {
      await render(hbs`
      {{#let (route-params 'parent.child' (query-params foo="bar")) as |routeParams|}}
        {{routeParams.url}}
      {{/let}}`);

      assert.strictEqual(this.element.textContent.trim(), '/child?foo=bar');
    });

    test('route-params yields correct URL value with query params from context options', async function (assert) {
      this.set('queryParams', { queryParams: { foo: 'bar' } });

      await render(hbs`
      {{#let (route-params 'parent.child' queryParams) as |routeParams|}}
        {{routeParams.url}}
      {{/let}}`);

      assert.strictEqual(this.element.textContent.trim(), '/child?foo=bar');
    });

    test('route-params only calls urlFor once per render', async function (assert) {
      assert.expect(1);

      let router = this.owner.lookup('service:router');
      router.urlFor = () => {
        assert.ok(true, 'urlFor called');
        return '/foo';
      };

      await render(hbs`
      {{#let (route-params 'parent.child') as |routeParams|}}
        {{routeParams.url}}
      {{/let}}`);
    });

    test('route-params only calls transitionTo once per render', async function (assert) {
      assert.expect(1);

      class MockedRouteParams extends RouteParams {
        get transitionTo() {
          assert.ok(true, 'transitionTo called');
          return super.transitionTo;
        }
      }
      class RouteParamsMockHelper extends RouteParamsHelper {
        compute(params) {
          return new MockedRouteParams(this.router, params);
        }
      }

      this.owner.register('helper:route-params-mock', RouteParamsMockHelper);

      await render(hbs`
      {{#let (route-params-mock 'parent.child') as |routeParams|}}
        {{routeParams.transitionTo}}
      {{/let}}`);

      this.owner.unregister('helper:route-params-mock');
    });

    test('route-params actions invoke transitionTo', async function (assert) {
      assert.expect(1);

      class MockedRouteParams extends RouteParams {
        get transitionTo() {
          return () => {
            assert.ok(true, 'transtionTo invoked');
          };
        }
      }

      class RouteParamsMockHelper extends RouteParamsHelper {
        compute(params) {
          return new MockedRouteParams(this.router, params);
        }
      }

      this.owner.register('helper:route-params-mock', RouteParamsMockHelper);

      await render(hbs`
      {{#let (route-params-mock 'parent.child') as |routeParams|}}
        <button {{action routeParams.transitionTo}}></button>
      {{/let}}`);

      await click('button');

      this.owner.unregister('helper:route-params-mock');
    });

    test('calls preventDefault on event (e.g. `onclick={{routeParams.transitionTo}}`)', async function (assert) {
      assert.expect(2);

      let fakeRouter = {
        transitionTo: () => {
          assert.ok(true, 'transtionTo invoked');
        },
      };

      class MockedRouteParams extends RouteParams {
        constructor(_router, params) {
          super(fakeRouter, params);
        }
      }

      class RouteParamsMockHelper extends RouteParamsHelper {
        compute(params) {
          return new MockedRouteParams(this.router, params);
        }
      }

      this.owner.register('helper:route-params-mock', RouteParamsMockHelper);

      await render(hbs`
      {{#let (route-params-mock 'parent.child') as |routeParams|}}
        <a href="/" onclick={{routeParams.transitionTo}}></a>
      {{/let}}`);

      let element = this.element;
      element.addEventListener('click', (event) => {
        assert.ok(
          event.defaultPrevented,
          'default should have been prevented on click event'
        );
      });

      await click('a');

      this.owner.unregister('helper:route-params-mock');
    });

    test('route-params only calls replaceWith once per render', async function (assert) {
      assert.expect(1);

      class MockedRouteParams extends RouteParams {
        get replaceWith() {
          assert.ok(true, 'replaceWith called');
          return super.replaceWith;
        }
      }

      class RouteParamsMockHelper extends RouteParamsHelper {
        compute(params) {
          return new MockedRouteParams(this.router, params);
        }
      }

      this.owner.register('helper:route-params-mock', RouteParamsMockHelper);

      await render(hbs`
      {{#let (route-params-mock 'parent.child') as |routeParams|}}
        {{routeParams.replaceWith}}
      {{/let}}`);

      this.owner.unregister('helper:route-params-mock');
    });

    test('route-params actions invoke replaceWith', async function (assert) {
      assert.expect(1);

      class MockedRouteParams extends RouteParams {
        get replaceWith() {
          return () => {
            assert.ok(true, 'replaceWith invoked');
          };
        }
      }

      class RouteParamsMockHelper extends RouteParamsHelper {
        compute(params) {
          return new MockedRouteParams(this.router, params);
        }
      }

      this.owner.register('helper:route-params-mock', RouteParamsMockHelper);

      await render(hbs`
      {{#let (route-params-mock 'parent.child') as |routeParams|}}
        <button {{action routeParams.replaceWith}}></button>
      {{/let}}`);

      await click('button');

      this.owner.unregister('helper:route-params-mock');
    });

    test('route-params yields correct isActive value', async function (assert) {
      assert.expect(6);

      let currentURL = '/current-url';
      let router = this.owner.lookup('service:router');
      router.isActive = () => {
        assert.ok(true, 'isActive called');
        return router.get('currentURL') === currentURL;
      };

      router.set('_router.currentURL', currentURL);

      await render(hbs`
      {{#let (route-params 'parent.child') as |routeParams|}}
        <a href="{{routeParams.url}}" class="{{if routeParams.isActive 'active' 'inactive'}}">Blah</a>
      {{/let}}`);

      assert.dom('a').hasClass('active');

      router.set('_router.currentURL', '/different-url');

      await settled();

      assert.dom('a').doesNotHaveClass('active');
      router.set('_router.currentURL', currentURL);

      await settled();

      assert.dom('a').hasClass('active');
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
        hbs`
        {{#let (route-params 'foo') as |routeParams|}}
          <a href="{{routeParams.url}}" class="{{if routeParams.isActive 'active' 'inactive'}}">Blah</a>
        {{/let}}
        {{outlet}}
        `
      );
    });

    test('isActive updates when currentURL changes', async function (assert) {
      await visit('/');

      assert.dom('a').hasClass('inactive');

      await visit('/foo');

      assert.dom('a').hasClass('active');

      await visit('/');

      assert.dom('a').hasClass('inactive');
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

      assert.dom('a').hasClass('inactive');

      let visitPromise = visit('/foo');

      await waitFor('.loading-spinner');

      assert.dom('a').hasClass('inactive');

      slowModelDeferred.resolve();

      await visitPromise;

      assert.dom('a').hasClass('active');
    });
  });
});
