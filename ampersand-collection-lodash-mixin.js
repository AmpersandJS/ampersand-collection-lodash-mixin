/*$AMPERSAND_VERSION*/
var _ = {
    all: require('lodash.every'),
    any: require('lodash.some'),
    collect: require('lodash.map'),
    contains: require('lodash.includes'),
    countBy: require('lodash.countby'),
    detect: require('lodash.find'),
    difference: require('lodash.difference'),
    drop: require('lodash.drop'),
    each: require('lodash.foreach'),
    every: require('lodash.every'),
    filter: require('lodash.filter'),
    find: require('lodash.find'),
    findWhere: require('lodash.findwhere'),
    first: require('lodash.first'),
    foldl: require('lodash.reduce'),
    foldr: require('lodash.reduceright'),
    forEach: require('lodash.foreach'),
    groupBy: require('lodash.groupby'),
    head: require('lodash.first'),
    includes: require('lodash.includes'),
    include: require('lodash.includes'),
    indexBy: require('lodash.indexby'),
    indexOf: require('lodash.indexof'),
    initial: require('lodash.initial'),
    inject: require('lodash.reduce'),
    invoke: require('lodash.invoke'),
    isEmpty: require('lodash.isempty'),
    last: require('lodash.last'),
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
    select: require('lodash.filter'),
    shuffle: require('lodash.shuffle'),
    size: require('lodash.size'),
    some: require('lodash.some'),
    sortBy: require('lodash.sortby'),
    tail: require('lodash.rest'),
    take: require('lodash.take'),
    toArray: require('lodash.toarray'),
    where: require('lodash.where'),
    without: require('lodash.without')
};
var slice = [].slice;
var mixins = {};


// Underscore methods that we want to implement on the Collection.
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'sample', 'partition'
];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function (method) {
    if (!_[method]) return;
    mixins[method] = function () {
        var args = slice.call(arguments);
        args.unshift(this.models);
        return _[method].apply(_, args);
    };
});

// Underscore methods that take a property name as an argument.
var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

// Use attributes instead of properties.
_.each(attributeMethods, function (method) {
    if (!_[method]) return;
    mixins[method] = function (value, context) {
        var iterator = _.isFunction(value) ? value : function (model) {
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

module.exports = mixins;
