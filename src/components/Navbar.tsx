import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-200">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-center w-full font-mono text-2xl">beuni</h1>
      </div>
    </nav>
  );
};

export default Navbar;
