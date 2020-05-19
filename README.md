# ember-router-helpers

[![Build Status](https://travis-ci.org/rwjblue/ember-router-helpers.svg?branch=master)](https://travis-ci.org/rwjblue/ember-router-helpers)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v3.12 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-router-helpers
```

Usage
------------------------------------------------------------------------------

* `route-params`

```hbs
{{#with (route-params "parent.child") as |routeParams|}}
  <a href={{routeParams.url}} class={{if routeParams.isActive "active" "inactive"}}>Blah</a>
{{/with}}
```

* `transition-to`

```hbs
<button onclick={{transition-to "parent.child"}}></button>
```

* `is-active`

```hbs
{{is-active "parent.child"}}
```

* `url-for`
```hbs
{{url-for "parent.child"}}
```
