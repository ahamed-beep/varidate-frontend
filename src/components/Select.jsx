import React from 'react';

const Select = ({ label, id, name, value, onChange, options, required = false, defaultOption = "Select..." }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>{defaultOption}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}

    </select>
    
  </div>
);

export default Select;