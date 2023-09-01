import short from "short-uuid";

const translator = short(short.constants.flickrBase58);

/**
 * A short, unique, user-friendly id
 * - generated from UUID and can be converted back to one
 *    translator.toUUID(shortId)
 */
export const makeId = (): string => {
  return translator.generate();
};
