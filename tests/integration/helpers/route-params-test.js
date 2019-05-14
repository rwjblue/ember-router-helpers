
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setRouteParamsClass } from 'ember-router-helpers/helpers/route-params';
import RouteParams from 'ember-router-helpers/utils/route-params';

module('helper:route-params', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.lookup('router:main').setupRouter();
  });

  hooks.afterEach(function() {
    setRouteParamsClass(RouteParams);
  });

  test('route-params yields correct URL value', async function(assert) {
    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        {{routeParams.url}}
      {{/with}}`);

    assert.dom('*').hasText('/child');
  });

  test('route-params yields correct URL value with query-params helper', async function(assert) {
    await render(hbs`
      {{#with (route-params 'parent.child' (query-params foo="bar")) as |routeParams|}}
        {{routeParams.url}}
      {{/with}}`);

    assert.dom('*').hasText('/child?foo=bar');
  });

  test('route-params yields correct URL value with query params from context options', async function(assert) {
    this.set('queryParams', { queryParams: { foo: 'bar' }});

    await render(hbs`
      {{#with (route-params 'parent.child' queryParams) as |routeParams|}}
        {{routeParams.url}}
      {{/with}}`);

    assert.dom('*').hasText('/child?foo=bar');
  });

  test('route-params only calls urlFor once per render', async function(assert) {
    assert.expect(1);

    let router = this.owner.lookup('service:router');
    router.urlFor = () => {
      assert.ok(true, 'urlFor called');
      return '/foo';
    }

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        {{routeParams.url}}
      {{/with}}`);
  });

  test('route-params only calls transitionTo once per render', async function(assert) {
    assert.expect(1);

    class MockedRouteParams extends RouteParams {
      get transitionTo() {
        assert.ok(true, 'transitionTo called');
        return super.transitionTo;
      }
    }

    setRouteParamsClass(MockedRouteParams);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        {{routeParams.transitionTo}}
      {{/with}}`);
  });

  test('route-params actions invoke transitionTo', async function(assert) {
    assert.expect(1);

    class MockedRouteParams extends RouteParams {
      get transitionTo() {
        return () => {
          assert.ok(true, 'transtionTo invoked');
        };
      }
    }

    setRouteParamsClass(MockedRouteParams);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        <button {{action routeParams.transitionTo}}></button>
      {{/with}}`);

    await click('button');
  });

  test('calls preventDefault on event (e.g. `onclick={{routeParams.transitionTo}}`)', async function(assert) {
    assert.expect(2);

    let fakeRouter = {
      transitionTo: () => {
        assert.ok(true, 'transtionTo invoked');
      }
    };

    class MockedRouteParams extends RouteParams {
      constructor(_router, params) {
        super(fakeRouter, params);
      }
    }

    setRouteParamsClass(MockedRouteParams);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        <a href="/" onclick={{routeParams.transitionTo}}></a>
      {{/with}}`);

    let element = this.element;
    element.addEventListener('click', (event) => {
      assert.ok(event.defaultPrevented, 'default should have been prevented on click event');
    });

    await click('a');
  });

  test('route-params only calls replaceWith once per render', async function(assert) {
    assert.expect(1);

    class MockedRouteParams extends RouteParams {
      get replaceWith() {
        assert.ok(true, 'replaceWith called');
        return super.replaceWith;
      }
    }

    setRouteParamsClass(MockedRouteParams);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        {{routeParams.replaceWith}}
      {{/with}}`);
  });

  test('route-params actions invoke replaceWith', async function(assert) {
    assert.expect(1);

    class MockedRouteParams extends RouteParams {
      get replaceWith() {
        return () => {
          assert.ok(true, 'replaceWith invoked');
        };
      }
    }

    setRouteParamsClass(MockedRouteParams);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        <button {{action routeParams.replaceWith}}></button>
      {{/with}}`);

    await click('button');
  });

  test('route-params yields correct isActive value', async function(assert) {
    assert.expect(6);

    let currentURL = '/current-url';
    let router = this.owner.lookup('service:router');
    router.isActive = () => {
      assert.ok(true, 'isActive called');
      return router.get('currentURL') === currentURL;
    }

    router.set('_router.currentURL', currentURL);

    await render(hbs`
      {{#with (route-params 'parent.child') as |routeParams|}}
        <a href="{{routeParams.url}}" class="{{if routeParams.isActive 'active' 'inactive'}}">Blah</a>
      {{/with}}`);

    assert.dom('a').hasClass('active');

    router.set('_router.currentURL', '/different-url');

    await settled();

    assert.dom('a').doesNotHaveClass('active');
    router.set('_router.currentURL', currentURL);

    await settled();

    assert.dom('a').hasClass('active');
  });
});
