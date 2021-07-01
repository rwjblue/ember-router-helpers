import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('replace-with', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let invocationArguments = (this.invocationArguments = []);

    this.owner.register(
      'service:router',
      class extends Service {
        replaceWith() {
          invocationArguments.push([...arguments]);
        }
      }
    );
  });

  test('it will call replaceWith on the router service when invoked', async function (assert) {
    await render(
      hbs`<button onclick={{replace-with 'parent.child'}}></button>`
    );

    await click('button');

    assert.deepEqual(this.invocationArguments, [['parent.child']]);
  });

  test('it will call preventDefault if event is passed when invoked', async function (assert) {
    assert.expect(2);

    await render(
      hbs`<button onclick={{replace-with 'parent.child'}}></button>`
    );

    this.element.addEventListener('click', (event) => {
      assert.ok(event.defaultPrevented, 'event should have default prevented');
    });

    await click('button');

    assert.deepEqual(this.invocationArguments, [['parent.child']]);
  });
});
