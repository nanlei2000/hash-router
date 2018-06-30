### a quite simple router implemented with ES6 syntax 

you can initialize a router using a entrance node

``const router = new Router("#app")``

then,set a homepage goes like:

      router.route('', () => {
            router.go('home')
         })

      router.route('home', () => {
         router.render('this is home')
      })

use a substring to create serial routes ,if the hash string include the substring you set,then callback execute   
if you set the same hash for ``router.route()`` and ``router.match()`` ,the callback for ``router.route()`` will not execute

      router.route('show',function(){
            router.render('this is show')
            //you will nerver see this...
         })
         
      router.match('show',function(){
         router.render('this is show also')
      })