var test = require('tape')
var set = require('./index')
var E = require('emmitt')
var spy = require('ispy')

test('sets attribute', function(t){
  var obj = {}
  set(obj, 'name', 'blondie')
  t.equal(obj.name, 'blondie')
  t.end()
})

test('emits change events', function(t){
  var obj = {}
  var onChange = spy()
  E.on(obj, 'change', onChange)
  var onChangeName = spy()
  E.on(obj, 'change:name', onChangeName)
  set(obj, 'name', 'blondie')
  t.assert(onChange.called, 'should have called')
  t.deepEqual(onChange.lastCall.args, [])
  t.assert(onChangeName.called, 'should have called')
  t.deepEqual(onChangeName.lastCall.args, ['blondie'])
  t.end()
})

test('doesnt fire change if set to the same value', function(t){
  var obj = { name: 'bob' }
  var onChange = spy()
  E.on(obj, 'change', onChange)
  var onChangeName = spy()
  E.on(obj, 'change:name', onChangeName)
  set(obj, 'name', 'bob')
  t.assert(!onChange.called, 'shouldnt have called')
  t.assert(!onChangeName.called, 'shouldnt have called')
  t.end()
})

test('can also set collection of attributes', function(t){
  var obj = {}
  set(obj, {
    name: 'bob',
    age: 3
  })
  t.equal(obj.name, 'bob')
  t.equal(obj.age, 3)
  t.end()
})

test('fires one change event for setting a set of attributes', function(t){
  var obj = {}
  var onChange = spy()
  E.on(obj, 'change', onChange)
  set(obj, {
    name: 'bob',
    age: 3
  })
  t.equal(onChange.callCount, 1)
  t.end()
})

test('if given any other type for the second param throws', function(t){
  var obj = {}
  t.throws(function(){
    set(obj, function(){})
  })
  t.end()
})

test('can also set silently (no events)', function(t){
  var obj = {}
  var onChange = spy()
  var onChangeName = spy()
  E.on(obj, 'change', onChange)
  E.on(obj, 'change:name', onChangeName)
  set(obj, 'name', 'bob', {silent: true})
  t.assert(!onChange.called)
  t.assert(!onChangeName.called)
  t.end()
})
