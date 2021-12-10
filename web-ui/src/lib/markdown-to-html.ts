/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 01:37
 */

import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
