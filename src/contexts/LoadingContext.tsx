import React, { createContext, useContext, useState } from 'react';
import { useIsMutating } from 'react-query';
import Loading from '../components/ui/Loading';

const LoadingContext = createContext<[() => void, () => void]>([
  () => void 0,
  () => void 0
]);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC = ({ children }) => {
  const [countLoading, setCountLoading] = useState(0);
  const isMutating = useIsMutating({
    // // exclude queries that add loading
    // predicate: (mutation) => {
    //   return !mutation.options.mutationKey?.includes('addAddress');
    // }
  });

  const present = () => {
    setCountLoading((prev) => prev + 1);
  };

  const dismiss = () => {
    setCountLoading((prev) => prev - 1);
  };

  return (
    <LoadingContext.Provider value={[present, dismiss]}>
      {children}
      {isMutating + countLoading > 0 && <Loading />}
    </LoadingContext.Provider>
  );
};
