import { myAlert } from "./alert";

export class GamepadUtils {
  public gamepad: Gamepad | null = null;

  public constructor() {
    window.addEventListener("gamepadconnected", this.onGamepadConnected);
    window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);
  }

  onGamepadConnected(ev: GamepadEvent) {
    myAlert(`连接成功 ${ev.gamepad.id}`);
    this.gamepad = ev.gamepad;
  }
  onGamepadDisconnected(ev: GamepadEvent) {
    myAlert(`断开连接 ${ev.gamepad.id}`);
    this.gamepad = null;
  }
}
