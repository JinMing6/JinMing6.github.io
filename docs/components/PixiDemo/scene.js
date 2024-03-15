import { Application, extensions, ResizePlugin } from 'pixi.js';

extensions.add(ResizePlugin);

export class PixiBaseScene {
  constructor(options) {
    const { el } = options;
    this.el = el;
    this.init();
  }

  async init() {
    this.app = new Application();
    await this.app.init({
      backgroundColor: '#f1f3f5',
      resizeTo: this.el,
    });
    this.el.appendChild(this.app.canvas);
  }

  destory() {
    this.app.destroy();
  }
}
