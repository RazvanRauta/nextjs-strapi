/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 20:10
 */

export interface ImageFormats {
  large: ImageSize | null;
  small: ImageSize | null;
  medium: ImageSize | null;
  thumbnail: ImageSize | null;
}

export interface ImageSize {
  ext: string | null;
  url: string | null;
  hash: string | null;
  mime: string | null;
  name: string | null;
  path: null;
  size: number | null;
  width: number | null;
  height: number | null;
}

export interface ParsedPost {
  id: string | null;
  title: string | null;
  slug: string | null;
  image: ImageFormats | null;
  date: string | null;
  text: string | null;
}
