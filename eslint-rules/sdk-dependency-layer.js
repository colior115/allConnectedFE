/**
 * Enforces that AllConnectedServerSdkAPI may only appear inside getDependencyAPIs()
 * of an entry point whose layer is 'DATA_SERVICE'.
 */

function findAncestor(node, predicate) {
  let current = node.parent;
  while (current) {
    if (predicate(current)) return current;
    current = current.parent;
  }
  return null;
}

function isPropertyNamed(prop, name) {
  return (
    prop.type === 'Property' &&
    (prop.key?.name === name || prop.key?.value === name)
  );
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        "AllConnectedServerSdkAPI may only be listed in getDependencyAPIs() of a 'DATA_SERVICE' layer entry point.",
    },
    messages: {
      wrongLayer:
        "AllConnectedServerSdkAPI can only be a dependency of 'DATA_SERVICE' layer entry points.",
    },
  },

  create(context) {
    return {
      Identifier(node) {
        if (node.name !== 'AllConnectedServerSdkAPI') return;

        // Must be inside a getDependencyAPIs property
        const getDepsProperty = findAncestor(
          node,
          (n) => n.type === 'Property' && isPropertyNamed(n, 'getDependencyAPIs'),
        );
        if (!getDepsProperty) return;

        // The entry point object is the direct parent of that property
        const entryPoint = getDepsProperty.parent;
        if (entryPoint?.type !== 'ObjectExpression') return;

        // Check that the entry point declares layer: 'DATA_SERVICE'
        const hasDataServiceLayer = entryPoint.properties.some(
          (prop) =>
            isPropertyNamed(prop, 'layer') &&
            prop.value?.type === 'Literal' &&
            prop.value?.value === 'DATA_SERVICE',
        );

        if (!hasDataServiceLayer) {
          context.report({ node, messageId: 'wrongLayer' });
        }
      },
    };
  },
};
