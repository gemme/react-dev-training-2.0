import React, {createContext, type Dispatch, type SetStateAction, useContext} from 'react';

interface UserContext {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContext>({
    userName: "", setUserName: () => {
    }
});

export const UserProvider = ({children}: { children: React.JSX.Element }) => {
    const [userName, setUserName] = React.useState<string>("");

    return (<UserContext.Provider value={{userName, setUserName}}>
        {children}
    </UserContext.Provider>)
}

export const useUserName = () => useContext(UserContext);
