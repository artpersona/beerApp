import React, { useState, useEffect } from 'react';
import * as Updates from 'expo-updates';

function useUpdates() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const checkForUpdates = async () => {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) setIsAvailable(true);
  };

  useEffect(() => {
    if (!__DEV__) checkForUpdates();
  }, []);

  const updateToLatest = async () => {
    setIsFetching(true);
    const fetchedUpdate = await Updates.fetchUpdateAsync();
    if (fetchedUpdate.isNew) {
      setIsFetching(false);
      await Updates.reloadAsync();
    }
  };

  return {
    isAvailable,
    isFetching,
    updateToLatest,
  };
}

export default useUpdates;
