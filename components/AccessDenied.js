'use client';
import React from 'react';

function AccessDenied() {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="bg-red-500 w-96 sm:w-auto px-6 py-4 rounded-md mb-4">
        <h1 className="text-3xl text-center font-bold mb-2">Access Denied</h1>
        <p className="text-lg">Sorry, you do not have permission to access this page.</p>
      </div>
      <a href="/" className="text-blue-500 hover:text-blue-700">Go back to home</a>
    </div>
  );
}

export default AccessDenied;
