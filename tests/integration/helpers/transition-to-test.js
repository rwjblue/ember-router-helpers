import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';

moduleForComponent('transition-to', {
  integration: true,

  beforeEach() {
    let owner = Ember.getOwner(this)
    let invocationArguments = this.invocationArguments = [];

    owner.register('service:router', Ember.Service.extend({
      transitionTo() {
        invocationArguments.push([...arguments]);
      }
    }));
  }
});

test('it will call transitionTo on the router service when invoked', async function(assert) {
  this.render(hbs`<button onclick={{transition-to 'parent.child'}}></button>`);

  await click('button');

  assert.deepEqual(
    this.invocationArguments,
    [
      [ 'parent.child' ]
    ]
  );
});

test('it will call preventDefault if event is passed when invoked', async function(assert) {
  assert.expect(2);

  this.render(hbs`<button onclick={{transition-to 'parent.child'}}></button>`);

  this._element.addEventListener('click', (event) => {
    assert.ok(event.defaultPrevented, 'event should have default prevented');
  });

  await click('button');

  assert.deepEqual(
    this.invocationArguments,
    [
      [ 'parent.child' ]
    ]
  );
});
