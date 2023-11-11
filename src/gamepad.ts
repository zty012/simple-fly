import { myAlert } from "./alert";

export class GamepadUtils {
  public gamepad: Gamepad | null = null;

  public constructor() {
    window.addEventListener("gamepadconnected", this._connect.bind(this));
    window.addEventListener("gamepaddisconnected", this._disconnect.bind(this));
    requestAnimationFrame(this._update.bind(this));
  }

  private _connect(ev: GamepadEvent) {
    myAlert(`连接成功 ${ev.gamepad.id}`);
    this.gamepad = navigator.getGamepads()[0];
  }
  private _disconnect(ev: GamepadEvent) {
    myAlert(`断开连接 ${ev.gamepad.id}`);
    this.gamepad = null;
  }
  public _update() {
    requestAnimationFrame(this._update.bind(this));
    this.gamepad = navigator.getGamepads()[0];
  }

  public get leftAxes() {
    let [x, y] = this.gamepad?.axes ?? [0, 0, 0, 0];
    y = -y;
    [x, y] = this._fixAxes(x, y);
    return [x, y];
  }
  public get rightAxes() {
    let [, , x, y] = this.gamepad?.axes ?? [0, 0, 0, 0];
    y = -y;
    [x, y] = this._fixAxes(x, y);
    return [x, y];
  }
  private _fixAxes(x: number, y: number): [number, number] {
    x = Math.abs(x) < 0.1 ? 0 : x;
    y = Math.abs(y) < 0.1 ? 0 : y;
    return [x, y];
  }
}
