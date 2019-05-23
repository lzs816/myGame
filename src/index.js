import { GameManager,Point} from "./lib/Base.js"
import { Tank,Bullet } from './lib/Object.js'

const gameManager = new GameManager(document.getElementById('canvas'))
window.game = gameManager
gameManager.init()

const tank1 = new Tank(30,30) 
gameManager.registerObjects([tank1])

const main = function(){
    gameManager.startLoop()
    window.requestAnimationFrame(main)
}
main()