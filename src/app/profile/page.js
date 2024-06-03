"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [movieLists, setMovieLists] = useState([]);
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      router.push('/auth/login');
    } else {
      setUser(userData);
    }

    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setMovieLists([{ name: 'My Watchlist', isPublic: true, movies: storedWatchlist }]);
  }, [router]);

  const handleAddList = () => {
    if (listName.trim() === '') {
      alert('List name cannot be empty');
      return;
    }
    const newList = { name: listName, isPublic, movies: [] };
    setMovieLists([...movieLists, newList]);
    setListName('');
  };

  const handleDeleteList = (index) => {
    setMovieLists(movieLists.filter((_, i) => i !== index));
  };

  const handleRenameList = (index, newName) => {
    const updatedLists = [...movieLists];
    updatedLists[index].name = newName;
    setMovieLists(updatedLists);
  };

  const handleShareList = (index) => {
    alert(`List ${movieLists[index].name} is now shared!`);
  };

  const handleAddMovie = (index, movie) => {
    const updatedLists = [...movieLists];
    updatedLists[index].movies.push(movie);
    setMovieLists(updatedLists);
  };

  const handleDeleteMovie = (listIndex, movieIndex) => {
    const updatedLists = [...movieLists];
    updatedLists[listIndex].movies.splice(movieIndex, 1);
    setMovieLists(updatedLists);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl dark:text-amber-400 font-bold mb-4">User Profile</h1>
      <div className="profile-content bg-green-100 dark:bg-gray-400 p-4 rounded-lg shadow-lg">
        <p className="mb-1">Welcome to your Dashboard, {user.name}!</p>
        <div className="mt-4">
          <h2 className="text-xl text-white-400 font-bold mb-2">Create New WatchList →</h2>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="WatchList Name"
            className="border p-2 mb-2 w-full rounded-lg outline-none"
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            Public
          </label>
          <button onClick={handleAddList} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Add WatchList
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Your WatchLists</h2>
          <ul>
            {movieLists.map((list, index) => (
              <li key={index} className="border p-4 mb-2 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{list.name} ({list.isPublic ? 'Public' : 'Private'})</span>
                  <div className="flex space-x-2">
                    <button onClick={() => handleRenameList(index, prompt('New name:'))} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300">
                      Rename
                    </button>
                    <button onClick={() => handleShareList(index)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300">
                      Share
                    </button>
                    <button onClick={() => handleDeleteList(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
                      Delete
                    </button>
                  </div>
                </div>
                <ul className="mt-2">
                  {list.movies.map((movie, movieIndex) => (
                    <li key={movieIndex} className="flex justify-between items-center bg-gray-200 p-2 rounded mb-1">
                      <span>{movie.Title}</span>
                      <button onClick={() => handleDeleteMovie(index, movieIndex)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
                        Delete
                      </button>
                    </li>
                  ))}
                  <li className="flex">
                    <input type="text" placeholder="Add Movie" className="border p-2 w-full rounded-l-lg outline-none"/>
                    <button onClick={() => handleAddMovie(index, prompt('Movie name:'))} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300">
                      Add
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
