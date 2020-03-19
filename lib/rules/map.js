/**
 * @fileoverview map
 * @author Alexander Torbek
 */
'use strict';

module.exports = {
  meta: {
    docs: {
      description:
        'Replace lodash _.map on Array#map without checking that parameter is an array',
      recommended: false
    },
    fixable: 'code'
  },

  create: context => {
    let override = false;
    const sourceCode = context.getSourceCode();

    const isLodash = node => node.callee.object.name === '_';
    const isMap = node => node.callee.property.name === 'map';
    const isCE = node => node.type === 'ConditionalExpression';
    const isAE = node => node.type === 'ArrayExpression';
    const isOE = node => node.type === 'ObjectExpression';

    return {
      AssignmentExpression: node => {
        if ((node.left.name = '_')) {
          override = true;
        }
      },
      CallExpression: node => {
        if (isLodash(node) && isMap(node) && !override) {
          const [cln, f] = node.arguments;

          const collection = sourceCode.getText(cln);
          const fn = sourceCode.getText(f);
          const template = [
            `Array.isArray(${collection})`,
            '?',
            `${collection}.map(${fn})`,
            ':',
            `_.map(${collection}, ${fn})`
          ];

          const isArray =
            isCE(node.parent) &&
            sourceCode.getText(node.parent.test) === template[0] &&
            sourceCode.getText(node.parent.consequent) === template[2];

          if (isOE(cln) || isArray) {
            return;
          }

          if (isAE(cln)) {
            context.report({
              node,
              message:
                'Replace lodash _.map on Array#map without checking that parameter is an array',
              fix: fixer => {
                const me = template[2];
                return fixer.replaceText(node, me);
              }
            });

            return;
          }

          context.report({
            node,
            message: 'Replace lodash _.map on native Array#map',
            fix: fixer => {
              const me = `${template.join(' ')}`;
              return fixer.replaceText(node, me);
            }
          });
        }
      }
    };
  }
};
