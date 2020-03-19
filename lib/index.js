/**
 * @fileoverview eslint-plugin-lodash-to-native
 * @author  Alexander Torbek
 */
'use strict';

const requireIndex = require('requireindex');

module.exports.rules = requireIndex(__dirname + '/rules');

module.exports.processors = {};
