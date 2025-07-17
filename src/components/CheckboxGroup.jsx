import React from 'react';

const CheckboxGroup = ({ legend, options, selectedOptions, onChange }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-700 mb-2">{legend}</legend>
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {options.map(option => (
        <div key={option} className="flex items-center">
          <input
            id={`${legend}-${option}`}
            name={option}
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={`${legend}-${option}`} className="ml-2 block text-sm text-gray-900">
            {option}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default CheckboxGroup;