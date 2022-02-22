import { useEffect } from 'react';
import useCustomNavigate from './useCustomNavigate';
import useToggle from './useToggle';

const useAutoToggle = () => {
  const { isOpen, present, dismiss } = useToggle();
  const navigate = useCustomNavigate();

  useEffect(() => {
    present();
  }, [present]);

  const handleClose = () => {
    dismiss();
    navigate(-1);
  };

  return { isOpen, dismiss: handleClose };
};

export default useAutoToggle;
