const KeySymbol = []

for (let i = 0; i < 500; i++) {
    KeySymbol[i] = Symbol(i)
}

const KeyCode = {
    space: KeySymbol[32],
    left: KeySymbol[37],
    up: KeySymbol[38],
    right: KeySymbol[39],
    down: KeySymbol[40],
    a: KeySymbol[65],
    b: KeySymbol[66],
    c: KeySymbol[67],
    d: KeySymbol[68],
}

class Point {
    x = 0
    y = 0
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Circle {
    point
    r
    constructor(point, r) {
        this.point = point
        this.r = r;
    }
}

class Sharp {
    point
    canvas
    ctx
    game
    constructor(width, height) {
        this.canvas = document.createElement('canvas')
        document.body.append(this.canvas)
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext('2d')
        this.point = new Point(0, 0)
    }

    init(game) {
        this.game = game
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.fillStyle = "#888";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    destory() {
        this.canvas.remove()
        this.canvas = null
        this.ctx = null
    }
}

class InputManager {

    constructor() {
        this.keyDownObj = {}
        this.keyUpObj = {}
    }

    keyDown(code) {
        this.keyDownObj[KeySymbol[code]] = true
    }

    pressKey() {

    }

    keyUp(code) {
        this.keyDownObj[KeySymbol[code]] = false
        this.keyUpObj[KeySymbol[code]] = true
    }

    isUpKey(SymbolCode) {
        return !!this.keyUpObj[SymbolCode]
    }

    clearUpKey() {
        this.keyUpObj = {}
    }

    isPressKey(SymbolCode) {
        return !!this.keyDownObj[SymbolCode]
    }

    next(obj, eCallBack) {
        for (let x of Object.getOwnPropertyNames(KeyCode)) {
            if (eCallBack[KeyCode[x]] && this.isPressKey(KeyCode[x])) {
                eCallBack[KeyCode[x]](obj)
            }
        }
    }

    nextUp(obj, eCallBack) {
        for (let x of Object.getOwnPropertyNames(KeyCode)) {
            if (eCallBack[KeyCode[x]] && this.isUpKey(KeyCode[x])) {
                eCallBack[KeyCode[x]](obj)
            }
        }
    }
}

class TimeManager {
    lastTime = void 0
    step = void 0
    printNumber = void 0
    frameNumber = void 0

    constructor() {
        this.frameNumber = 0
    }

    updateTime(lockFrameNumber) {
        let timestamp = (new Date()).getTime()
        if (this.lastTime) {
            let step = timestamp - this.lastTime
            if (lockFrameNumber > 0 && step * lockFrameNumber < 1000) {
                return false
            }
            this.step = step
        }
        this.lastTime = timestamp
        return true
    }

    getTime() {
        return (!!this.step ? this.step : 0) / 1000
    }

    getFrameNumber() {
        let current = (new Date()).getTime()
        if (!this.printNumber) {
            this.printNumber = current
        }
        if (current - this.printNumber > 500 && this.step) {
            this.printNumber = current
            return this.frameNumber = 1000 / this.step
        }
        return this.frameNumber
    }
}

class GameManager {
    canvas = void 0
    ctx = void 0
    timeManager = new TimeManager()
    inputManager = new InputManager()
    drawObj = []
    lockFrameNumber = 60;

    constructor(canvas) {
        this.inputManager = new InputManager()
        this.timeManager = new TimeManager()
        this.lockFrameNumber = 0;
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    printFrameNumber() {
        let num = Math.floor(this.timeManager.getFrameNumber())
        if (num == 0) {
            return
        }
        let ctx = this.ctx
        ctx.fillStyle = "black";               //设置填充颜色为紫色
        ctx.font = '20px "微软雅黑"';           //设置字体
        ctx.fillText(num + "帧", 750, 20);        //填充文字
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "#ccc";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    init() {
        let that = this
        document.onkeydown = function (e) {
            if (e && e.keyCode) {
                that.inputManager.keyDown(e.keyCode)
            }
        }
        document.onkeyup = function (e) {
            if (e && e.keyCode) {
                that.inputManager.keyUp(e.keyCode)
            }
        }
    }

    startLoop() {
        if (!this.timeManager.updateTime(this.lockFrameNumber)) {
            return
        }
        this.nextFrame()
        this.clear()
        this.reDraw()
        this.printFrameNumber()
    }
    registerObject(obj) {
        if (!this.drawObj.includes(obj)) {
            this.drawObj.push(obj)
            if (obj.init) {
                obj.init()
            }
        }
    }
    registerObjects(objArr) {
        objArr.forEach(obj => {
            this.registerObject(obj)
        });
    }

    unRegisterObject(obj) {
        let position = -1;
        if ((position = this.drawObj.indexOf(obj)) > -1) {
            this.drawObj.splice(position, 1)
            if (obj.destory) {
                obj.destory()
            }
        }
    }
    nextFrame() {
        this.drawObj.forEach(obj => {
            obj.nextFrame(this.timeManager.getTime(), this)
        })
        this.inputManager.clearUpKey()
    }
    reDraw() {
        this.drawObj.forEach(obj => {
            obj.drawToOwn(this.ctx)
            obj.drawToParent(this.ctx)
        })
    }
}

export { KeyCode, Point, Sharp, Circle }
export { InputManager, TimeManager, GameManager } 