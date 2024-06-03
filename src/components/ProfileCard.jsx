import React from 'react';
import { useRouter } from 'next/navigation';

const ProfileCard = ({ user }) => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleMoreDetails = () => {
    router.push('/profile');
  };

  return (
    <div className="bg-white dark:bg-gray-400 border shadow-lg rounded-lg p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto mb-4">
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p className="mb-1">Username: {user.username}</p>
      <p className="mb-4">Email: {user.email}</p>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-2 w-full hover:bg-red-600 transition duration-300"
      >
        Sign Out
      </button>
      <button
        onClick={handleMoreDetails}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
      >
        More Details
      </button>
    </div>
  );
};

export default ProfileCard;
