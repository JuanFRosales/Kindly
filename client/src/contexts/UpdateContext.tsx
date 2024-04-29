/*import {Dispatch, SetStateAction, createContext, useState} from 'react';

type UpdateContextType = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

const UpdateContext = createContext<UpdateContextType | null>(null);

const UpdateProvider = ({children}: {children: React.ReactNode}) => {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <UpdateContext.Provider value={{update, setUpdate}}>
      {children}
    </UpdateContext.Provider>
  );
};

export {UpdateProvider, UpdateContext};
*/
