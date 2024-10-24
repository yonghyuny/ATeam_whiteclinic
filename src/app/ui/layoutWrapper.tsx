'use client';

import React from 'react';
import ShaSideNav from './ShaSideNav';
import { cn } from '@/lib/utils';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <ShaSideNav />
      <main
        className={cn(
          'flex-1',
          'ml-16 lg:ml-64',
          'p-8',
          'transition-all duration-300'
          // overflow-auto 제거
        )}
      >
        <div className="w-full">
          {' '}
          {/* max-w-7xl 제거 */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutWrapper;
