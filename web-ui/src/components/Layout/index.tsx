/**
 *  @author: Razvan Rauta
 *  Date: Dec 10 2021
 *  Time: 01:55
 */

import AlertPreview from '../AlertPreview';
import Footer from '../Footer';
import Header from '../Header';

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
      <Header />
      {children}
      <Footer />
    </>
  );
}
