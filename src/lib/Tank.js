import {Sharp,KeyCode, GameManager, Point} from "./Base.js"
import { Bullet } from "./Bullet.js";

class Tank extends Sharp {
    width
    height
    speed
    ag
    agRaw
    translateX
    translateY
    img
    setPoint(point){
        this.point.x = point.x
        this.point.y = point.y
    }
    constructor(width = 10, height = 10, speed = 100,angle = 0) {
        super(width*2,height*2)
        this.translateX = width/2
        this.translateY = height/2
        this.width = width
        this.height = height
        this.speed = speed
        this.angle = angle
        this.ag = 0
        this.agRaw = 0
        this.img = new Image()
        this.img.src = "./img/tank1.png"
    }

    get angle (){
        return this.agRaw
    }

    set angle (value){
        this.agRaw = value
        this.ag = value * Math.PI / 180
    }

    shoot(){
        let bullet = new Bullet(5,5,100,this.angle)
        bullet.setPoint(new Point(this.point.x+this.width/2,this.point.y+this.height/2))
        window.game.registerObject(bullet)
    }

    nextFrame(time, game) {
        const inputManager = game.inputManager
        const h = time * this.speed
        const v = time * this.speed
        const a = time * this.speed
        inputManager.next(this, {
            [KeyCode.left](obj) {
                obj.point.x -= h
            },
            [KeyCode.right](obj) {
                obj.point.x += h
            },
            [KeyCode.up](obj) {
                obj.point.y -= v
            },
            [KeyCode.down](obj) {
                obj.point.y += v
            },
            [KeyCode.a](obj) {
                obj.angle -= a
            },
            [KeyCode.d](obj) {
                obj.angle += a
            },
            [KeyCode.d](obj) {
                obj.angle += a
            }
        })
        inputManager.nextUp(this,{
            [KeyCode.space](obj) {
                obj.shoot()
            }
        })
    }
    drawToOwn() {
        this.clear()
        this.ctx.translate(this.translateX,this.translateY)
        this.ctx.fillStyle = 'green' 
        this.ctx.translate(this.width/2,this.height/2)
        this.ctx.rotate(this.ag) 
        this.ctx.translate(-this.width/2,-this.height/2)
        this.ctx.drawImage(this.img,0,0, this.width, this.height)
        //this.ctx.fillRect(0,0, this.width, this.height)
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    drawToParent(ctx){
        ctx.drawImage(this.canvas,this.point.x,this.point.y)
    }
}

export {Tank}