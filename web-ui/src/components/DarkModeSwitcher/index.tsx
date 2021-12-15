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
  const [toggleClass, setToggleClass] = useState({ toggle: '', switch: '' });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        if (!localStorage.getItem('theme')) setTheme('dark');
      } else {
        if (!localStorage.getItem('theme')) setTheme('light');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      setToggleClass({
        switch: 'translate-x-6 bg-white',
        toggle: 'bg-blue-600',
      });
      setIsChecked(true);
    } else {
      setToggleClass({
        switch: 'translate-x-0 bg-gray-900',
        toggle: 'bg-gray-200',
      });
      setIsChecked(false);
    }
  }, [theme]);

  return (
    <div className='flex h-10 items-center justify-between w-28'>
      <SunIcon
        className='h-10 text-yellow-400 w-10 dark:text-gray-500'
        onClick={() => setTheme('light')}
      />
      <Switch
        checked={isChecked}
        onChange={switchTheme}
        className={`${toggleClass.toggle} relative inline-flex items-center h-2 rounded-full w-11 mx-2`}
      >
        <span className='sr-only'>Toggle DarkMode</span>
        <span
          className={clsx(
            toggleClass.switch,
            'duration-300 h-4 inline-block rounded-full transform w-4'
          )}
        />
      </Switch>
      <MoonIcon
        className='h-9 text-gray-500 w-9 dark:text-cyan-700'
        onClick={() => setTheme('dark')}
      />
    </div>
  );
}
