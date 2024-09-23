export class StringUtil {
  static replaceSpaces(input: string, replaceWith: string) {
    return input.replace(/\s/g, replaceWith);
  }
}