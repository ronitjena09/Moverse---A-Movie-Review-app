// src/components/Header.jsx
"use client"
import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';
import ProfileCard from './ProfileCard';

const Header = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleProfileClick = () => {
    setShowProfileCard(prevState => !prevState);
  };

  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <div className='flex gap-4'>
        <MenuItem title="home" address='/' Icon={AiFillHome} />
        <MenuItem title="about" address='/about' Icon={BsFillInfoCircleFill} />
        <div className="relative cursor-pointer flex items-center">
          <FaUser className="text-xl" onClick={handleProfileClick} />
          <span className="ml-2" onClick={handleProfileClick}>Profile</span>
          {showProfileCard && user && (
            <div className="absolute top-12 right-0">
              <ProfileCard user={user} />
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <DarkModeSwitch />
        <Link href={'/'} className='flex gap-1 items-center'>
          <span className='text-2xl font-bold text-white bg-lime-500 py-1 px-2 rounded-lg'>MoVerse</span>
          <span className='text-xl hidden sm:inline'>A Movie Search Platform!</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
