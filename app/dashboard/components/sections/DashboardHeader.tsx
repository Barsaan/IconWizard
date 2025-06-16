'use client'

import React from 'react';
import { useAuth } from '../../../providers/auth-provider';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-[#1E1E2F] mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your icons today</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">{user?.email?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <span className="text-gray-800 font-medium">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
