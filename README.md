## a quite simple router implemented with ES6 syntax and express style🚀 

first,import this module:  

``const Router = require('hash-router')``  

you can initialize a router using a entrance node

``const router = new Router("#app")``

there are 5 methods in router instance inherited from ``Router.prototype``,see what i code below,and you will known how to use.    

for instance,set a homepage goes like:

      router.route('', () => {
         router.go('home')
      })

      router.route('home', () => {
         router.render('this is home')
      })

      router.route('cantGetInto', () => {
         router.back()
      })

use a substring to create serial routes ,if the hash string include the substring you set,then callback execute 

if you set the same hash for ``router.route()`` and ``router.match()`` ,the callback will execute by turn

      router.route('same',() => {
         alert('route method')
      })
         
      router.match('same',() => {
         alert('match method')
      })
