// Decides dynamic sizes.
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
export const CURRENT_WIDTH = width;
export const CURRENT_HEIGHT = height;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

// Decides size based on screen size
export function dySize(size) {
  if (size === undefined) return undefined;
  return Math.floor(K * size);
}
