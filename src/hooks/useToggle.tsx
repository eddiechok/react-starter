import { useCallback, useState } from 'react';
import { ToggleProps } from '../shared/type';

type UseToggleReturn = Required<ToggleProps> & {
  toggle: () => void;
};

function useToggle(init = false): UseToggleReturn {
  const [isOpen, setIsOpen] = useState(init);

  const present = useCallback(() => {
    setIsOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((_isOpen) => !_isOpen);
  }, []);

  return { isOpen, present, dismiss, toggle };
}

export default useToggle;
