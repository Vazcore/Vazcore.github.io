module.exports = function ({ types: t }) {
	return {
		visitor: {
			Literal: function (literal) {
        if (literal.parent.type === 'ObjectProperty'
          || literal.parent.type === 'VariableDeclarator') {
            if (literal.node.value === true) literal.node.value = false; 
        }
      }
		}
	};
};
