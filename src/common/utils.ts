/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * function to return a `naive` generated unique id
 * @param n a number to be set after the timestamp, this is required to be set when creating multiple id in the same statement, to ensure order of creation
 * @returns a string to be used as an unique key string
 */
export function naiveID(n?: number): string {
  const randomStrOf4chrs = (n ?? getRandomInt(0, 9999))
    .toString()
    .padStart(4, "0");
  const ts = Date.now().toString(36) + randomStrOf4chrs;
  return ts;
}
