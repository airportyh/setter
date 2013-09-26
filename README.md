Setter
======

Setter is a small Javascript library with which you can set attributes on any object, and get attribute change notification ala Backbone - via the emmitt library.

## Install

Install via NPM `npm install setter` or Bower `bower install setter`.

## Use

Basic

    var set = require('setter')
    var E = require('emmitt')
    var man = { name: 'bob' }
    E.on(man, 'change', function(){
      console.log('Man was changed!')
    })
    E.on(man, 'change:name', function(newName){
      console.log("Man's name was changed to", newName)
    })
    set(man, 'name', 'dan')

Set multiple attributes

    set(man, {
      name: 'jen',
      age: 5
    })

Use the silent option (no events)

    set(name, 'name', 'bobby', {silent: true})
    // or 
    set(name, {
      name: 'bobby',
      age: 5
    }, {silent: true})
