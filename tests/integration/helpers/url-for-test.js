import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('url-for', 'helper:url-for', {
  integration: true,

  beforeEach() {
    Ember.getOwner(this).lookup('router:main').setupRouter();
  }
});

test('it can generate simple urls', function(assert) {
  this.render(hbs`{{url-for 'parent.child'}}`);

  assert.equal(this._element.textContent, '/child');
});
