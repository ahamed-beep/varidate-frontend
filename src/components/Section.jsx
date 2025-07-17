import React from 'react';

const Section = ({ title, children }) => (
  <div className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
    <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-6">{title}</h2>
    {children}
  </div>
);

export default Section;