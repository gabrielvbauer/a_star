import { Application } from 'pixi.js'

export class Game {
  app: Application

  constructor() {
    this.app = new Application()
  }

  public async start() {
    await this.app.init({
      resizeTo: window
    })
  }
}