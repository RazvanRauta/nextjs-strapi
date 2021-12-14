/**
 *  @author: Razvan Rauta
 *  Date: Dec 13 2021
 *  Time: 23:11
 */

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React, { ReactElement } from 'react';
import { Fragment } from 'react';

import DarkModeSwitcher from '../DarkModeSwitcher';
import NextImage from '../NextImage';

export default function Header(): ReactElement {
  return (
    <Popover className='relative'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6'>
        <div className='flex justify-between items-center py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10 dark:border-gray-700'>
          <div className='flex justify-start lg:flex-1 lg:w-0'>
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
          </div>
          <div className='-my-2 -mr-2 md:hidden'>
            <Popover.Button className='inline-flex justify-center items-center p-2 text-gray-500 rounded-md dark:hover:bg-gray-500 dark:hover:text-gray-200 hover:text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:outline-none'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='w-6 h-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <div className='hidden justify-end items-center md:flex md:flex-1 lg:w-0'>
            <DarkModeSwitcher />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 top-0 z-10 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='h-[50vh] bg-white rounded-lg divide-y-2 divide-gray-400 ring-1 ring-black ring-opacity-5 shadow-lg dark:bg-gray-700 dark:divide-gray-900'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex justify-between items-center'>
                <div>
                  <NextImage
                    className='animate-spin-slow w-10 h-10'
                    src='/favicon/ms-icon-310x310.png'
                    width={310}
                    height={310}
                    alt='logo'
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex justify-center items-center p-2 text-gray-500 rounded-md dark:hover:bg-gray-500 dark:hover:text-gray-200 hover:text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:outline-none active:focus:ring-gray-500'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='w-6 h-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='px-5 py-6 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <DarkModeSwitcher />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
