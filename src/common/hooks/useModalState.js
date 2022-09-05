import { useCallback, useState } from 'react';

const useModalState = () => {
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => setModal(!modal), [modal]);

  return { modal, toggle };
};

export default useModalState;
