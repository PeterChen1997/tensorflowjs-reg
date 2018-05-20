export default class Draw {
  constructor(el) {
    this.el = el
    this.canvas = document.getElementById(this.el)
    this.ctx = this.canvas.getContext('2d')
    this.pos = {
      x: 0,
      y: 0
    }
    this.data = {}
  }

  setPosition(e) {
    this.pos.x = e.offsetX;
    this.pos.y = e.offsetY;
  }

  setImgData() {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    this.data =  this.ctx.getImageData(0, 0, 28, 28)
  }

  getImgData() {
    return this.data
  }
  
  init() {
    // 保持this指向当前类
    this.canvas.addEventListener('mouseup', (e) => this.onUp(e))
    this.canvas.addEventListener('mouseenter', (e) => this.onEnter(e))
    this.canvas.addEventListener('mousedown', (e) => this.onDown(e))
    this.canvas.addEventListener('mousemove', (e) => this.onMove(e))
  }

  onMove(e) {
    if (e.buttons !== 1) {
      return;
    }

    this.ctx.beginPath(); // begin

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }

  onDown(e) {
    this.setPosition(e);
  }

  onEnter(e) {
    this.setPosition(e)
  }

  onUp(e) {
    this.setImgData()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}