import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBadgeScore } from '../Redux/profile';

const BadgeVote = ({ profileId, fieldType, fieldIndex, userId }) => {
  const dispatch = useDispatch();
const { badgeScore, badgeLevel, successMessage, error } = useSelector((state) => state.profile);

  const handleVote = (vote) => {
    dispatch(updateBadgeScore({ profileId, fieldType, fieldIndex, userId, vote }))
      .unwrap()
      .then(() => {
        toast.success('Badge score updated');
        setTimeout(() => dispatch(resetBadgeState()), 3000);
      })
      .catch((err) => {
        toast.error(err || 'Vote failed');
      });
  };

  const getBadgeLevel = (score) => {
    if (score >= 15) return 'Platinum';
    if (score >= 10) return 'Gold';
    if (score >= 5) return 'Silver';
    return 'Black';
  };

  const badgeLevels = getBadgeLevel(badgeScore);

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Do you verify this field?</h3>

      <div className="flex space-x-4">
        <button
          onClick={() => handleVote('yes')}
      
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Yes
        </button>
        <button
          onClick={() => handleVote('no')}
    
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          No
        </button>
      </div>

      {(badgeScore > 0 || badgeScore === 0) && (
        <div className="mt-4 text-sm text-gray-700">
          <p>👍 Badge Score: <strong>{badgeScore}</strong></p>
          <p>🏅 Badge Level: <strong>{badgeLevel}</strong></p>
        </div>
      )}

     
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
    </div>
  );
};

export default BadgeVote;
