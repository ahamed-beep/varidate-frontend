import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllBadgeScores } from '../Redux/profile';

const BadgeScoreUpdater = () => {
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector((state) => state.profile);
  const [scores, setScores] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleScoreChange = (fieldPath, value) => {
    setScores(prev => ({
      ...prev,
      [fieldPath]: Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProfile?._id) return;
    
    setIsUpdating(true);
    try {
      await dispatch(updateAllBadgeScores({
        profileId: selectedProfile._id,
        scores
      })).unwrap();
      alert('All badge scores updated successfully!');
      setScores({});
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Field groups for organized display
  const fieldGroups = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Name', path: 'nameBadgeScore' },
        { label: "Father's Name", path: 'fatherNameBadgeScore' },
        { label: 'Gender', path: 'genderBadgeScore' },
        { label: 'Date of Birth', path: 'dobBadgeScore' },
        { label: 'CNIC', path: 'cnicBadgeScore' }
      ]
    },
    {
      title: 'Contact Information',
      fields: [
        { label: 'Mobile', path: 'mobileBadgeScore' },
        { label: 'Email', path: 'emailBadgeScore' },
        { label: 'Address', path: 'addressBadgeScore' },
        { label: 'City', path: 'cityBadgeScore' },
        { label: 'Country', path: 'countryBadgeScore' }
      ]
    },
    {
      title: 'Documents',
      fields: [
        { label: 'Profile Image', path: 'profileImageUrlBadgeScore' },
        { label: 'Resume', path: 'pdfUrlBadgeScore' }
      ]
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Update All Badge Scores</h2>
      <form onSubmit={handleSubmit}>
        {fieldGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">
              {group.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.fields.map((field) => (
                <div key={field.path} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={scores[field.path] || ''}
                    onChange={(e) => handleScoreChange(field.path, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Education Fields */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">Education</h3>
          {selectedProfile?.education?.map((edu, eduIndex) => (
            <div key={eduIndex} className="mb-4 pl-4 border-l-2 border-gray-200">
              <h4 className="font-medium mb-2">Education #{eduIndex + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Degree Title', path: `education.${eduIndex}.degreeTitleBadgeScore` },
                  { label: 'Institute', path: `education.${eduIndex}.instituteBadgeScore` },
                  { label: 'Start Date', path: `education.${eduIndex}.startDateBadgeScore` },
                  { label: 'End Date', path: `education.${eduIndex}.endDateBadgeScore` }
                ].map((field) => (
                  <div key={field.path} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={scores[field.path] || ''}
                      onChange={(e) => handleScoreChange(field.path, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Fields */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">Experience</h3>
          {selectedProfile?.experience?.map((exp, expIndex) => (
            <div key={expIndex} className="mb-4 pl-4 border-l-2 border-gray-200">
              <h4 className="font-medium mb-2">Experience #{expIndex + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Job Title', path: `experience.${expIndex}.jobTitleBadgeScore` },
                  { label: 'Company', path: `experience.${expIndex}.companyBadgeScore` },
                  { label: 'Start Date', path: `experience.${expIndex}.startDateBadgeScore` },
                  { label: 'End Date', path: `experience.${expIndex}.endDateBadgeScore` }
                ].map((field) => (
                  <div key={field.path} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={scores[field.path] || ''}
                      onChange={(e) => handleScoreChange(field.path, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isUpdating || Object.keys(scores).length === 0}
          className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Updating...' : 'Update All Scores'}
        </button>
      </form>
    </div>
  );
};

export default BadgeScoreUpdater;