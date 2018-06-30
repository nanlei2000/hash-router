/**
 * Created by @nanlei2000 in 2018-06-30 09:27:25
 */

class Router {
   constructor(entrance) {
      this.entrance = document.querySelector(entrance)
      this.routes = new Map()
      this.subStrMap = new Map()
      let noop = () => {}
      this.routes.set('', noop)
      this._active()
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
      if (this.routes.get(hash) === undefined) {
         this.render('')
      } else {
         this.routes.get(hash)()
      }
   }
   _runMatch() {
      let hash = location.hash.substr(1)
      if (this.subStrMap.size !== 0) {
         for (let key of this.subStrMap.keys()) {
            if (hash.indexOf(key) !== -1) {
               this.subStrMap.get(key)()
               break
            } else {
               this.render('')
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
}

module.exports = Router