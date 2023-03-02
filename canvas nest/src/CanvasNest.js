
import { bind, clear } from 'size-sensor';
import { requestAnimationFrame, cancelAnimationFrame, range, canvasStyle } from './utils';

export default class CanvasNest {

  static version = __VERSION__;

  constructor(el, config) {
    this.el = el;

    this.c = {
      zIndex: -1,       
      opacity: 0.5,         
      color: '0,0,0',       
      pointColor: '0,0,0',  
      count: 99,            
      ...config,
    };

    this.canvas = this.newCanvas();
    this.context = this.canvas.getContext('2d');

    this.points = this.randomPoints();
    this.current = {
      x: null, 
      y: null, 
      max: 20000 
    };
    this.all = this.points.concat([this.current]);

    this.bindEvent();

    this.requestFrame(this.drawCanvas);
  }

  bindEvent() {
    bind(this.el, () => {
      this.canvas.width = this.el.clientWidth;
      this.canvas.height = this.el.clientHeight;
    });

    this.onmousemove = window.onmousemove;
    window.onmousemove = e => {
      this.current.x = e.clientX - this.el.offsetLeft + document.scrollingElement.scrollLeft; 
      this.current.y = e.clientY - this.el.offsetTop + document.scrollingElement.scrollTop; 
      this.onmousemove && this.onmousemove(e);
    };

    this.onmouseout = window.onmouseout;
    window.onmouseout = () => {
      this.current.x = null;
      this.current.y = null;
      this.onmouseout && this.onmouseout();
    };
  }

  randomPoints = () => {
    return range(this.c.count).map(() => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      xa: 2 * Math.random() - 1, 
      ya: 2 * Math.random() - 1,
      max: 6000 
    }));
  };

  newCanvas() {
    if (getComputedStyle(this.el).position === 'static') {
      this.el.style.position = 'relative'
    }
    const canvas = document.createElement('canvas'); 
    canvas.style.cssText = canvasStyle(this.c);

    canvas.width = this.el.clientWidth;
    canvas.height = this.el.clientHeight;

    this.el.appendChild(canvas);
    return canvas;
  }

  requestFrame(func) {
    this.tid = requestAnimationFrame(() => func.call(this));
  }

  drawCanvas() {
    const context = this.context;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const current = this.current;
    const points = this.points;
    const all = this.all;

    context.clearRect(0, 0, width, height);

    let e, i, d, x_dist, y_dist, dist; 
    
    points.forEach((r, idx) => {
      r.x += r.xa;
      r.y += r.ya; 
      r.xa *= r.x > width || r.x < 0 ? -1 : 1;
      r.ya *= r.y > height || r.y < 0 ? -1 : 1; 
      context.fillStyle = `rgba(${this.c.pointColor})`;
      context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); 
      
      for (i = idx + 1; i < all.length; i ++) {
        e = all[i];
        
        if (null !== e.x && null !== e.y) {
          x_dist = r.x - e.x; 
          y_dist = r.y - e.y; 
          dist = x_dist * x_dist + y_dist * y_dist; 

          dist < e.max && (e === current && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), 
            d = (e.max - dist) / e.max,
            context.beginPath(),
            context.lineWidth = d / 2,
            context.strokeStyle = `rgba(${this.c.color},${d + 0.2})`,
            context.moveTo(r.x, r.y),
            context.lineTo(e.x, e.y),
            context.stroke());
        }
      }
    });
    this.requestFrame(this.drawCanvas);
  }

  destroy() {
    
    clear(this.el);

    
    window.onmousemove = this.onmousemove; 
    window.onmouseout = this.onmouseout;

   
    cancelAnimationFrame(this.tid);

    
    this.canvas.parentNode.removeChild(this.canvas);
  }
}
