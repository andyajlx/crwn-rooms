import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "firebase/auth";
//the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
       const unsubscribe = onAuthStateChangedListener()
    console.log(user);
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}