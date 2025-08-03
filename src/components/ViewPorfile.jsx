import React from 'react';
import BadgeIcon from './BadgeIcon';

const RadioGroup = ({ name, value, onChange, disabled }) => (
  <div className="flex gap-4 items-center mt-1">
    <label className="text-sm text-gray-600 flex items-center gap-1">
      <input 
        type="radio" 
        name={name} 
        value="yes" 
        checked={value === 'yes'} 
        onChange={onChange} 
        disabled={disabled} 
        className="mr-1"
      />
      Yes
    </label>
    <label className="text-sm text-gray-600 flex items-center gap-1">
      <input 
        type="radio" 
        name={name} 
        value="no" 
        checked={value === 'no'} 
        onChange={onChange} 
        disabled={disabled} 
        className="mr-1"
      />
      No
    </label>
  </div>
);

const InfoField = ({ label, value, name, feedback, onFeedbackChange, isValidated, badgeLevel }) => (
  <div className="py-3">
    <div className="flex items-center gap-2">
      <BadgeIcon badgeLevel={badgeLevel} />
      <div className="w-full">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
          {label}
          {isValidated && <span className="ml-2 text-green-600 text-xs">(Validated)</span>}
        </label>
        <input
          type="text"
          value={value || ''}
          readOnly
          className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
        />
        {value && !isValidated && (
          <RadioGroup
            name={name}
            value={feedback[name]}
            onChange={(e) => onFeedbackChange(name, e.target.value)}
            disabled={isValidated}
          />
        )}
      </div>
    </div>
  </div>
);

export default InfoField;