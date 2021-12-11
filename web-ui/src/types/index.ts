/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 20:10
 */

export interface ImageFormats {
  large: ImageSize;
  small: ImageSize;
  medium: ImageSize;
  thumbnail: ImageSize;
}

export interface ImageSize {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
}
