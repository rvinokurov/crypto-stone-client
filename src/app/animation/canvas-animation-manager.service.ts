import {Injectable} from '@angular/core';

export type AnimationFunction = () => void;


@Injectable()
export class CanvasAnimationManagerService {

  animationFunctions: AnimationFunction[] = [];

  redraw = () => {
    for (let i = 0; i < this.animationFunctions.length; i++) {
      this.animationFunctions[i]();
    }
    window.requestAnimationFrame(this.redraw);
  };

  constructor() {
    this.redraw();
  }

  addAnimationFunction(animationFunction: AnimationFunction) {
    this.animationFunctions.push(animationFunction);
  }

  removeAnimationFunction(animationFunction: AnimationFunction) {
    this.animationFunctions = this.animationFunctions.filter((f) => {
      return f !== animationFunction;
    })
  }

}
