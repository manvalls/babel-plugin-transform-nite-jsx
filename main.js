
module.exports = function ({ types: t }) {
  let JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  let visitor = require('./main/builder')({
    pre(state) {
      let tagName = state.tagName;
      let args    = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post() { }
  });

  visitor.Program = function (path, state) { };

  return {
    inherits: require('./main/syntax'),
    visitor
  };
}
