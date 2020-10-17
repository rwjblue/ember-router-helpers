# ember-router-helpers

[![CI Build](https://github.com/rwjblue/ember-router-helpers/workflows/CI/badge.svg)](https://github.com/rwjblue/ember-router-helpers/actions?query=workflow%3A%22CI%22)

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* ember-auto-import >= 2
* Node.js v12 or above

## Installation

```
ember install ember-router-helpers
```

## Usage

The following examples are based on the routing map below.

```javascript
Router.map(function () {
  this.route("parent", function () {
    this.route("child");
  });
});
```

* `route-params`

```hbs
{{#let (route-params "parent.child") as |routeParams|}}
  <a
    href={{routeParams.url}}
    class={{if routeParams.isActive "active" "inactive"}}
  >parent.child</a>
{{/let}}
```

* `transition-to`

```hbs
<button {{on "click" (transition-to "parent.child")}}>parent.child</button>
```

* `replace-with`

```hbs
<button onclick={{replace-with "parent.child"}}>parent.child</button>
```

* `is-active`

```hbs
{{is-active "parent.child"}}
```

* `url-for`

```hbs
<a href={{url-for "parent.child"}}>parent.child</a>
```

### Event Dispatcher

`HTMLAnchorEventDispatcher` extends default Ember's `EventDispatcher` to allow any `HTMLAnchorElement` with root relative `href` to cause a route transition.

There are some exceptions which prevents from route transitions:

* non-recognized `href` by `router`,
* `target="_blank"` attribute,
* `download` attribute,
* mouse event modifier keys (`shiftKey`, `metaKey`, `altKey`, `ctrlKey`),
* mouse event non-left buttons (`which > 1`).

## Attribution

Thanks to [ember-href-to](https://github.com/intercom/ember-href-to) for inspiration of `HTMLAnchorEventDispatcher` implementation.
