/*


import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
// import {UpdateContext} from '../contexts/UpdateContext';

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return context;
};

// const useUpdateContext = () => {
//   const context = useContext(UpdateContext);
//   if (!context) {
//     throw new Error('useUpdateContext must be used within an UpdateProvider');
//   }

//   return context;
// };

export {useUserContext};

*/
