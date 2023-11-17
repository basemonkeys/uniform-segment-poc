import { useEffect } from 'react';
import { useUniformContext } from '@uniformdev/context-react';

const TrackerScoreSync = () => {
  const { context } = useUniformContext();
  useEffect(() => {
    const fetchTraits = async () => {
      const response = await fetch('/api/uniform/traits');
      const { traits } = await response.json();
      await context.update({
        quirks: {
          ...traits,
        },
      });
    };
    fetchTraits();
  }, [context]);
  return null;
};

export default TrackerScoreSync;