/*$AMPERSAND_VERSION*/
var isFunction = require('lodash.isfunction');
var _ = {
    countBy: require('lodash.countby'),
    difference: require('lodash.difference'),
    drop: require('lodash.drop'),
    each: require('lodash.foreach'),
    every: require('lodash.every'),
    filter: require('lodash.filter'),
    find: require('lodash.find'),
    forEach: require('lodash.foreach'),
    groupBy: require('lodash.groupby'),
    includes: require('lodash.includes'),
    indexBy: require('lodash.indexby'),
    indexOf: require('lodash.indexof'),
    initial: require('lodash.initial'),
    invoke: require('lodash.invoke'),
    isEmpty: require('lodash.isempty'),
    lastIndexOf: require('lodash.lastindexof'),
    map: require('lodash.map'),
    max: require('lodash.max'),
    min: require('lodash.min'),
    partition: require('lodash.partition'),
    reduce: require('lodash.reduce'),
    reduceRight: require('lodash.reduceright'),
    reject: require('lodash.reject'),
    rest: require('lodash.rest'),
    sample: require('lodash.sample'),
    shuffle: require('lodash.shuffle'),
    some: require('lodash.some'),
    sortBy: require('lodash.sortby'),
    take: require('lodash.take'),
    without: require('lodash.without')
};
var slice = [].slice;
var mixins = {};


// lodash methods that we want to implement on the Collection.
var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'filter', 'reject', 'every', 'some', 'includes', 'invoke', 'max', 'min',
    'take', 'initial', 'rest', 'drop', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'sample', 'partition'
];

// Mix in each lodash method as a proxy to `Collection#models`.
_.each(methods, function (method) {
    if (!_[method]) return;
    mixins[method] = function () {
        var args = slice.call(arguments);
        args.unshift(this.models);
        return _[method].apply(_, args);
    };
});

// lodash methods that take a property name as an argument.
var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

// Use attributes instead of properties.
_.each(attributeMethods, function (method) {
    if (!_[method]) return;
    mixins[method] = function (value, context) {
        var iterator = isFunction(value) ? value : function (model) {
            return model.get ? model.get(value) : model[value];
        };
        return _[method](this.models, iterator, context);
    };
});

// Return models with matching attributes. Useful for simple cases of
// `filter`.
mixins.where = function (attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return this[first ? 'find' : 'filter'](function (model) {
        var value;
        for (var key in attrs) {
            value = model.get ? model.get(key) : model[key];
            if (attrs[key] !== value) return false;
        }
        return true;
    });
};

// Return the first model with matching attributes. Useful for simple cases
// of `find`.
mixins.findWhere = function (attrs) {
    return this.where(attrs, true);
};

// Plucks an attribute from each model in the collection.
mixins.pluck = function (attr) {
    return _.invoke(this.models, 'get', attr);
};

// We implement the following trivial methods ourselves.

// Gets first model
mixins.first = function () {
    return this.models[0];
};

// Gets last model
mixins.last = function () {
    return this.models[this.models.length - 1];
};

// Gets size of collection
mixins.size = function () {
    return this.models.length;
};

module.exports = mixins;
