import { useCallback, useState } from 'react';
import { ToggleProps } from '../shared/type';

function useToggle(init = false) {
  const [isOpen, setIsOpen] = useState(init);

  // open modal
  const present = useCallback(() => {
    setIsOpen(true);
  }, []);

  // hide modal
  const dismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, present, dismiss } as Required<ToggleProps>;
}

export default useToggle;
