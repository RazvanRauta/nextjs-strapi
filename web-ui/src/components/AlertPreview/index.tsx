import clsx from 'clsx';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function AlertPreview(): ReactElement {
  return (
    <div className={clsx('border-b')}>
      <div className='py-2 text-sm text-center'>
        <>
          This page is a preview.
          <Link href='/api/exit-preview'>
            <a className='underline transition-colors duration-200 hover:text-cyan'>
              {' '}
              Click here{' '}
            </a>
          </Link>
          to exit preview mode.
        </>
      </div>
    </div>
  );
}
