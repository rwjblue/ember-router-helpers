# ember-router-helpers

[![CI Build](https://github.com/rwjblue/ember-router-helpers/workflows/CI/badge.svg)](https://github.com/rwjblue/ember-router-helpers/actions?query=workflow%3A%22CI%22)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* ember-auto-import >= 2
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-router-helpers
```

Usage
------------------------------------------------------------------------------

* `route-params`

```hbs
{{#let (route-params "parent.child") as |routeParams|}}
  <a href={{routeParams.url}} class={{if routeParams.isActive "active" "inactive"}}>Blah</a>
{{/let}}
```

* `transition-to`

```hbs
<button {{on "click" (transition-to "parent.child")}}></button>
```

* `replace-with`

```hbs
<button onclick={{replace-with "parent.child"}}></button>
```

* `is-active`

```hbs
{{is-active "parent.child"}}
```

* `url-for`
```hbs
{{url-for "parent.child"}}
```
