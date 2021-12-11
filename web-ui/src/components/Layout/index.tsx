import * as React from 'react';

import AlertPreview from '../AlertPreview';

export default function Layout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: boolean | null;
}) {
  // Put Header or Footer Here
  return (
    <>
      {preview && <AlertPreview />}
      {children}
    </>
  );
}
