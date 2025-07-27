// components/ProfileFieldWithVoting.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBadgeScore } from '../Redux/profile';

const BadgeIcon = ({ level }) => {
  const getBadgeStyle = () => {
    switch(level) {
      case 'Platinum': 
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Gold': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver': 
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default: 
        return 'bg-black-100 text-black-800 border-black-300';
    }
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}>
      {level}
    </span>
  );
};

const ProfileFieldWithVoting = ({ 
  label, 
  value, 
  fieldPath, 
  profileId,
  currentScore = 0,
  currentLevel = 'Black',
  isVerified = false
}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?.id);
  const [localScore, setLocalScore] = React.useState(currentScore);
  const [localLevel, setLocalLevel] = React.useState(currentLevel);

  const handleVote = async (vote) => {
    if (!userId) return;
    
    try {
      const result = await dispatch(updateBadgeScore({
        profileId,
        fieldPath,
        userId,
        vote
      })).unwrap();
      
      setLocalScore(result.badgeScore);
      setLocalLevel(result.badgeLevel);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {value || 'Not specified'}
          </p>
        </div>
        
        <div className="flex flex-col items-end ml-4">
          <div className="flex items-center mb-2">
            <BadgeIcon level={localLevel} />
            <span className="ml-2 text-sm font-medium text-gray-700">
              ({localScore} votes)
            </span>
          </div>
          
          {!isVerified && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleVote('yes')}
                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
              >
                Verify
              </button>
              <button
                onClick={() => handleVote('no')}
                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFieldWithVoting;