import * as Base from './Base.js'

class CanvasUtil {
    //画圆
    static circle(ctx, circle) {
        //开始一个新的绘制路径
        ctx.beginPath();
        ctx.arc(circle.point.x, circle.point.y, circle.r, 0, 2*Math.PI, false);
        //按照指定的路径绘制弧线
        ctx.stroke();
    }

    static outThePoint(canvas,point){
        const width = canvas.width
        const height = canvas.height
        return (point.x<0||point.x>width||point.y<0||point.y>height)
    }
}

export {CanvasUtil}