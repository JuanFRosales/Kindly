import {useContext} from 'react';
import {UpdateContext} from '../contexts/UpdateContext';



const useUpdateContext = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error('useUpdateContext must be used within an UpdateProvider');
  }

  return context;
};

export default useUpdateContext;
