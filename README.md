# ampersand-collection-lodash-mixin

Lead Maintainer: [Clemens Stolle](https://github.com/klaemo)

A mixin for extending ampersand-collection with a bunch of lodash methods.

~~If you're using an [ampersand-rest-collection](http://ampersandjs.com/docs/#ampersand-rest-collection) this is already mixed in for you.~~
(Not yet, but maybe soon? :D)

Out of the box, ampersand-collections proxy the [ES5 iteration methods already](http://ampersandjs.com/docs/#ampersand-collection-proxied-es5-array-methods-9) so you don't _have_ to use this mixin, but if you want lodash methods, or better browser support, you can use this.

## install

```
npm install ampersand-collection-lodash-mixin
```

## example

```javascript
var Collection = require('ampersand-collection');
var lodashMixin = require('ampersand-collection-lodash-mixin');


module.exports = Collection.extend(lodashMixin, {
    sampleMethod: function () {
        // now we've got lodash methods 
        // we can call that are applied to models
        // in the collection.
        this.filter( ... );
        this.some( ... );
        this.each( ... )
    }
});
```

## credits

All credit for underscore and this approach in backbone goes to Jeremy Ashkenas and the rest of the Backbone and Underscore authors.
All credit for lodash goes to John-David Dalton.

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) and/or [@klaemo](http://twitter.com/klaemo) on twitter.

## license

MIT

