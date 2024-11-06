import SideBar from '@/components/Sidebar.tsx/sideBar';
import React from 'react';
 

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-auto static bg-black">
      <div className="fixed left-0 top-0 h-full flex items-center">
        <SideBar/>
      </div>
      <div className="w-[640px] h-screen bg-white ext-center rounded-lg">
        {children}
      </div>
    </div>
  );
}


export default Layout;