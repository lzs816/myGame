import { Sharp, KeyCode,Circle, Point } from "./Base.js"
import { CanvasUtil } from "./Util.js"

class Bullet extends Sharp {
    /* _width
    height
    speed
    ag
    agRaw
    vx
    hy */
 

    constructor(width = 10, height = 10, speed = 100, angle = 0) {
        super(width, height)
        this.width = width
        this.height = height
        this.speed = speed
        this.angle = angle
    }
    setPoint(point) {
        this.point.x = point.x
        this.point.y = point.y
    }
    init(){
        this.ctx.fillStyle = 'red'
        CanvasUtil.circle(this.ctx,new Circle(new Point(this.width/2,this.height/2),this.width/2))
    }

    get angle() {
        return this.agRaw
    }

    set angle(value) {
        this.agRaw = value
        this.ag = value * Math.PI / 180
        this.vx = Math.sin(this.ag)
        this.hy = Math.cos(this.ag)
    }

    nextFrame(time, game) {
        const v = 0 |(time * this.speed * this.vx)
        const h = 0 |(time * this.speed * this.hy)
        this.point.x += v
        this.point.y -= h
        const that = this
        if(CanvasUtil.outThePoint(game.canvas,this.point)){
            game.unRegisterObject(that)
        }
    }
    drawToOwn() {
        
    }
    drawToParent(ctx) {
        ctx.drawImage(this.canvas, this.point.x, this.point.y)
    }
}

export { Bullet }