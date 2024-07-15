import React, { createContext, useState } from 'react';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [hasAddedJournalEntryThisWeek, setHasAddedJournalEntryThisWeek] = useState(false);
  const [rsQualityData, setRsQualityData] = useState(new Array(5).fill(0));
  const [journalEntries, setJournalEntries] = useState([]);
  const [topFriends, setTopFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEntries, setExpandedEntries] = useState({}); // Add expandedEntries state

  return (
    <JournalContext.Provider value={{
      hasAddedJournalEntryThisWeek,
      setHasAddedJournalEntryThisWeek,
      rsQualityData,
      setRsQualityData,
      journalEntries,
      setJournalEntries,
      topFriends,
      setTopFriends,
      loading,
      setLoading,
      expandedEntries,
      setExpandedEntries
    }}>
      {children}
    </JournalContext.Provider>
  );
};
