export default class VirtualElement {
  public x = 0;
  public y = 0;

  setCoords(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getBoundingClientRect() {
    return {
      width: 0,
      height: 0,
      x: this.x,
      y: this.y,
      top: this.y,
      left: this.x,
      right: this.x,
      bottom: this.y,
    };
  }
}
