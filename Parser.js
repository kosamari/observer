function Parser () {
  return function (input) {
    try {
      var syntax = esprima.parse(input)
    } catch(e) {
      return []
    }
    var elements = []
    var dict = {
      VariableDeclaration: function (el) {
        var tmp = []
        el.declarations.forEach(function (val) {
          tmp.push(val.id.name)
        })
        return tmp
      },
      FunctionDeclaration: function (el) {
        return [el.id.name]
      },
      ExpressionStatement: function (el) {
        if (el.expression.type === 'AssignmentExpression') {
          if (el.expression.left.type === 'Identifier') {
            return [el.expression.left.name]
          } else if (el.expression.left.type === 'MemberExpression') {
            return [el.expression.left.object.name]
          }
        } else if (el.expression.type === 'SequenceExpression') {
          var tmp = []
          el.expression.expressions.forEach(function (exp) {
            if (exp.type === 'AssignmentExpression') {
              tmp.push(exp.left.name)
            }
          })
          return tmp
        }else if (el.expression.type === 'CallExpression') {
          if (el.expression.callee.object) {
            return [el.expression.callee.object.name]
          }
        }
      }
    }
    syntax.body.forEach(function (el) {
      var ids = dict[el.type](el)
      if (ids) {
        elements = elements.concat(ids)
      }
    })
    return elements
  }
}
