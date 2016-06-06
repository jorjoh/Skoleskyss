'use strict'

module.exports = function(ary, max, options) {
  if (!ary || ary.length == 0) {
    console.log("tombla")
    return options.inverse(this)

  }
  else {
    var result = [ ]
    for (var i = 0; i < max && i < ary.length; ++i)
      result.push(options.fn(ary[i]))
    return result.join('')
  }
}
