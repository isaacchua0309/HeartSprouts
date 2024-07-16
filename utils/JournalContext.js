import React, { createContext, useState } from 'react';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../utils/firebaseHelper';
import { startOfWeek, subWeeks, isSameWeek } from 'date-fns';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [hasAddedJournalEntryThisWeek, setHasAddedJournalEntryThisWeek] = useState(false);
  const [rsQualityData, setRsQualityData] = useState(new Array(5).fill(0));
  const [journalEntries, setJournalEntries] = useState([]);
  const [topFriends, setTopFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEntries, setExpandedEntries] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fetchJournalData = async (email) => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, 'Users', email);
      const journalCollectionRef = collection(userDocRef, 'Journal');
      const journalDocs = await getDocs(journalCollectionRef);

      const endDate = new Date();
      const startDate = subWeeks(endDate, 4);
      let qualityData = new Array(5).fill(0);
      let hasEntryThisWeek = false;

      journalDocs.docs.forEach(doc => {
        const entryData = doc.data();
        const entryDate = new Date(entryData.Date);

        for (let i = 0; i < 5; i++) {
          const startOfCurrentWeek = startOfWeek(subWeeks(endDate, i), { weekStartsOn: 0 });
          if (isSameWeek(entryDate, startOfCurrentWeek, { weekStartsOn: 0 })) {
            qualityData[4 - i] += entryData.Quality;
          }
        }

        const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
        if (isSameWeek(entryDate, currentWeekStart, { weekStartsOn: 0 })) {
          hasEntryThisWeek = true;
        }
      });

      setRsQualityData(qualityData);
      setHasAddedJournalEntryThisWeek(hasEntryThisWeek);

      const entries = journalDocs.docs.map(doc => ({
        id: doc.id,
        date: new Date(doc.data().Date),
        friends: doc.data().FriendsSelected,
        quality: doc.data().Quality,
        question: doc.data().Question,
        wordEntry: doc.data().WordEntry,
      }));

      setJournalEntries(entries);
    } catch (error) {
      console.error('Error fetching journal data: ', error);
    } finally {
      setLoading(false);
    }
  };

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
      setExpandedEntries,
      shouldRefresh,
      setShouldRefresh,
      fetchJournalData,
    }}>
      {children}
    </JournalContext.Provider>
  );
};
