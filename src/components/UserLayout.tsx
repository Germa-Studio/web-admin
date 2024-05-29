import React from 'react';
import UserNavbar from './UserNavbar';
import Footer from './footer';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserNavbar />
      <div className="my-28 -z-50">{children}</div>
      <Footer isFull={true} sidebarOpen={false} />
    </div>
  );
}
