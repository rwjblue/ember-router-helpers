import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const RouterServiceMock = Ember.Service.extend({
  currentRouteName: Ember.computed('currentURL', function() {
    return this.get('currentURL').substring(1);
  }),

  isActive(routeName) {
    return this.get('currentRouteName') === routeName;
  }
});

moduleForComponent('is-active', 'helper:is-active', {
  integration: true,

  beforeEach() {
    this.owner = Ember.getOwner(this);
    this.owner.register('service:router', RouterServiceMock);
  }
});

test('it renders and rerenders when currentURL changes', async function(assert) {
  const router = this.owner.lookup('service:router');

  router.set('currentURL', '/foo');
  this.set('targetRoute', 'bar');
  this.render(hbs`{{is-active targetRoute}}`);

  assert.equal(this.$().text(), 'false', 'is-active is not true when curren route is different from target route');

  router.set('currentURL', '/bar');

  await wait();

  assert.equal(this.$().text(), 'true', 'is-active is true now when URL has changed');

  router.set('currentURL', '/foo');

  await wait();

  assert.equal(this.$().text(), 'false', 'is-active is false when URL has changed');
});

