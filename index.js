/**
 * Created by @nanlei2000 in 2018-06-30 09:27:25
 */

class Router {
   constructor(entrance) {
      this._init(entrance)
   }
   _init(entrance){
      this.entrance = document.querySelector(entrance)
      this.routes = new Map()
      this.subStrMap = new Map()
      let noop = () => {}
      this.routes.set('', noop)
      this._active()
      this.query = ''
      this.path = ''
   }
   route(hash, fn) {
      this.routes.set(hash, fn)
   }
   match(subStr, fn) {
      this.subStrMap.set(subStr, fn)
   }
   _active() {
      window.addEventListener('load', this._run.bind(this))
      window.addEventListener('hashchange', this._run.bind(this))
      window.addEventListener('load', this._runMatch.bind(this))
      window.addEventListener('hashchange', this._runMatch.bind(this))
   }
   _run() {
      let hash = location.hash.substr(1)
      if (this.routes.get(hash) != undefined) {
         this.query = ''
         this.path = hash
         this.routes.get(hash)()
      }
   }
   _runMatch() {  
      let hash = location.hash.substr(1)
      if (this.subStrMap.size !== 0 && hash.indexOf('?') !== -1 && !this.routes.has(hash)) {
         for (let key of this.subStrMap.keys()) {
            if (hash.indexOf(key) !== -1) {
               let obj = this._handleHash(hash)
               this.query = obj.query
               this.path = obj.path
               this.subStrMap.get(key)()
               break
            }
         }
      }
   }
   render(html) {
      this.entrance.innerHTML = html
   }
   go(hash) {
      location.hash = hash
   }
   back() {
      history.go(-1)
   }
   _handleHash(hash){
      let ind = hash.indexOf('?')
      let obj = {}
      obj.path = hash.substring(0,ind)
      obj.query = hash.substr(ind + 1)
      return obj
   }
   
}

// export default Router