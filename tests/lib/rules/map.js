/**
 * @fileoverview map
 * @author Alexander Torbek
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/map'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('map', rule, {
  valid: [
    '[].map(fn);',
    'Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn);',
    '_.map({x:1, y:2}, fn);',
    `_ = {map: () => []};
     const m2 = _.map([], fn);`
  ],

  invalid: [
    {
      code: '_.map(collection, fn);',
      output:
        'Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn);',
      errors: [
        {
          message: 'Replace lodash _.map on native Array#map'
        }
      ]
    },
    {
      code: '_.map([1, 2, 3], fn);',
      output: '[1, 2, 3].map(fn);',
      errors: [
        {
          message:
            'Replace lodash _.map on Array#map without checking that parameter is an array'
        }
      ]
    },
    {
      code:
        'Array.isArray(otherCollection) ? collection.map(fn) : _.map(collection, fn);',
      output:
        'Array.isArray(otherCollection) ? collection.map(fn) : Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn);',
      errors: [
        {
          message: 'Replace lodash _.map on native Array#map'
        }
      ]
    }
  ]
});
