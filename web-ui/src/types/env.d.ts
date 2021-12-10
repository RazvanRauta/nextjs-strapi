/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 10 2021
 * @ Time: 02:51
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API: string;
    }
  }
}

export {};
