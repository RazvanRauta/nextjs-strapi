/**
 *  @author: Razvan Rauta
 *  Date: Dec 13 2021
 *  Time: 23:11
 */

import React, { ReactElement } from 'react';

import NextImage from '../NextImage';

export default function Header(): ReactElement {
  return (
    <nav className='px-2 py-2.5 bg-white rounded border-gray-200 sm:px-4 dark:bg-gray-800'>
      <div className='container flex flex-wrap justify-between items-center mx-auto max-w-7xl'>
        <a href='#' className='flex'>
          <NextImage
            className='animate-spin-slow w-10 h-10'
            src='/favicon/ms-icon-310x310.png'
            width={310}
            height={310}
            alt='logo'
          />
          <span className='self-center ml-3 text-lg font-semibold whitespace-nowrap dark:text-white'>
            RRazvan
          </span>
        </a>
        <button
          data-collapse-toggle='mobile-menu'
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden dark:focus:ring-gray-600 dark:hover:bg-gray-700 dark:text-gray-400 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200'
          aria-controls='mobile-menu-2'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
          <svg
            className='hidden w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
          <ul className='flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-8 md:text-sm md:font-medium'>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:p-0 md:text-blue-700 md:bg-transparent dark:text-white'
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:dark:hover:bg-transparent md:dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:border-0 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50'
              >
                About
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:dark:hover:bg-transparent md:dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:border-0 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50'
              >
                Services
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 md:dark:hover:bg-transparent md:dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:border-0 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50'
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 text-gray-700 md:dark:hover:bg-transparent md:dark:hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:border-0 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50'
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
