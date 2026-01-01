import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center px-4 relative z-10 opacity-60">
      <p className="text-[10px] md:text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
        We are not responsible for any misuse. Use it reasonably and do not resell our goods.
      </p>
      <div className="mt-4 text-[10px] text-gray-600">
        &copy; 2026 UG Rewards Fan Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;