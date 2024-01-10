import { useState, useEffect } from 'react';
import { useData } from '../';

export const useConfig = () => {
  const { useDoc } = useData();
  const [data, isLoading, error] = useDoc();
  const [config, setConfig] = useState({});

  useEffect(() => {
    if (data?.data()) {
      console.log('configggg', data.data());
      setConfig(data.data());
    }
  }, [data]);

  return {
    config,
    setConfig,
    isLoading,
    error,
  };
};
