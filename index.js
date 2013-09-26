var E = require('emmitt')

module.exports = function(obj, $2, $3, $4){

  var anyChanged
  var attrs
  var options

  if (typeof $2 === 'object' && $2 != null){
    attrs = $2
    options = $3
  }else if (typeof $2 === 'string'){
    attrs = {}
    attrs[$2] = $3
    options = $4
  }else{
    throw new Error('Second argument should be a string or an object literal')
  }

  var silent = options && options.silent

  for (var attr in attrs){
    var attrChanged = setAttr(obj, attr, attrs[attr], silent)
    anyChanged = anyChanged || attrChanged
  }

  if (!silent && anyChanged){
    E.emit(obj, 'change')
  }

}

function setAttr(obj, attr, value, silent){
  if (obj[attr] !== value){
    obj[attr] = value
    if (!silent){
      E.emit(obj, 'change:' + attr, value)
    }
    return true
  }
  return false
}