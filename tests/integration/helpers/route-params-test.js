
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setRouteParamsClass } from 'ember-router-helpers/helpers/route-params';
import RouteParams from 'ember-router-helpers/utils/route-params';
import { click } from 'ember-native-dom-helpers';

moduleForComponent('route-params', 'helper:route-params', {
  integration: true,

  beforeEach() {
    this.owner = Ember.getOwner(this);
    this.owner.lookup('router:main').setupRouter();
  },

  afterEach() {
    setRouteParamsClass(RouteParams);
  }
});

test('route-params yields correct URL value', function(assert) {
  this.render(hbs`
    {{#with (route-params 'parent.child') as |routeParams|}}
      {{routeParams.url}}
    {{/with}}`
  );

  assert.equal(this.$().text().trim(), '/child');
});

test('route-params yields correct URL value with query-params helper', function(assert) {
  this.render(hbs`
    {{#with (route-params 'parent.child' (query-params foo="bar")) as |routeParams|}}
      {{routeParams.url}}
    {{/with}}`
             );

  assert.equal(this.$().text().trim(), '/child?foo=bar');
});

test('route-params yields correct URL value with query params from context options', function(assert) {
  this.set('queryParams', { queryParams: { foo: 'bar' }});

  this.render(hbs`
    {{#with (route-params 'parent.child' queryParams) as |routeParams|}}
      {{routeParams.url}}
    {{/with}}`
             );

  assert.equal(this.$().text().trim(), '/child?foo=bar');
});

test('route-params only calls urlFor once per render', function(assert) {
  assert.expect(1);

  let router = this.owner.lookup('service:router');
  router.urlFor = () => {
    assert.ok(true, 'urlFor called');
    return '/foo';
  }

  this.render(hbs`
    {{#with (route-params 'parent.child') as |routeParams|}}
      {{routeParams.url}}
    {{/with}}`);
});

test('route-params only calls transitionTo once per render', function(assert) {
  assert.expect(1);

  class MockedRouteParams extends RouteParams {
    get transitionTo() {
      assert.ok(true, 'transitionTo called');
      return super.transitionTo;
    }
  }

  setRouteParamsClass(MockedRouteParams);

  this.render(hbs`
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

  this.render(hbs`
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

  this.render(hbs`
    {{#with (route-params 'parent.child') as |routeParams|}}
      <a href="/" onclick={{routeParams.transitionTo}}></a>
    {{/with}}`);

  let element = this._element;
  element.addEventListener('click', (event) => {
    assert.ok(event.defaultPrevented, 'default should have been prevented on click event');
  });

  await click('a');
});

test('route-params only calls replaceWith once per render', function(assert) {
  assert.expect(1);

  class MockedRouteParams extends RouteParams {
    get replaceWith() {
      assert.ok(true, 'replaceWith called');
      return super.replaceWith;
    }
  }

  setRouteParamsClass(MockedRouteParams);

  this.render(hbs`
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

  this.render(hbs`
    {{#with (route-params 'parent.child') as |routeParams|}}
      <button {{action routeParams.replaceWith}}></button>
    {{/with}}`
  );

  await click('button');
});

test('route-params yields correct isActive value', function(assert) {
  assert.expect(2);

  let router = this.owner.lookup('service:router');
  router.isActive = () => {
    assert.ok(true, 'isActive called');
    return true;
  }

  this.render(hbs`
    {{#with (route-params 'parent.child') as |routeParams|}}
      <a href="{{routeParams.url}}" class="{{if routeParams.isActive 'active' 'inactive'}}">Blah</a>
    {{/with}}`
  );

  assert.ok(this.$('a').hasClass('active'));
});
