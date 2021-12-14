/**
 *  @author: Razvan Rauta
 *  Date: Dec 14 2021
 *  Time: 21:14
 */

import { Switch } from '@headlessui/react';
import { MoonIcon } from '@heroicons/react/outline';
import { SunIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React, { ReactElement } from 'react';
import { useEffect, useState } from 'react';

export default function DarkModeSwitcher(): ReactElement {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      if (!localStorage.getItem('theme')) setTheme('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className='flex justify-between items-center w-28 h-10'>
      <SunIcon
        className='w-10 h-10 text-yellow-400 dark:text-gray-500'
        onClick={() => setTheme('light')}
      />
      <Switch
        checked={isDarkMode}
        onChange={switchTheme}
        className={`${
          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex items-center h-2 rounded-full w-11 mx-2`}
      >
        <span className='sr-only'>Toggle DarkMode</span>
        <span
          className={clsx(
            isDarkMode && 'translate-x-6 bg-white',
            !isDarkMode && 'translate-x-0 bg-gray-900',
            'inline-block w-4 h-4 rounded-full duration-300 transform'
          )}
        />
      </Switch>
      <MoonIcon
        className='w-9 h-9 text-gray-500 dark:text-cyan-700'
        onClick={() => setTheme('dark')}
      />
    </div>
  );
}
