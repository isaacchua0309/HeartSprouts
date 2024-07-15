import React, { createContext, useState } from 'react';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <FriendsContext.Provider value={{ friends, setFriends, events, setEvents, loading, setLoading }}>
      {children}
    </FriendsContext.Provider>
  );
};
