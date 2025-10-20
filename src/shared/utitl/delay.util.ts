export class DelayUtil {
  static Wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}