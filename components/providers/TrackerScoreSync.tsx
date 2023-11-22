'use client'
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useEffect } from 'react';

export const TrackerScoreSync = () => {
  const { context } = useUniformContext();
  //console.log("you are in the tracker sync");
  //console.log(fetch('/api/uniform/traits'));
  useEffect(() => {
    const fetchTraits = async () => {
      console.log("calling fetchTraits");
      const response = await fetch('/api/uniform/traits');
      const { traits } = await response.json();
    
      await context?.update({
        quirks: {
          ...traits,
        },
      });
    };
    fetchTraits();
  }, [context]);
  return null;
};
