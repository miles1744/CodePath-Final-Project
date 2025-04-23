import { createContext, useEffect, useState, useContext } from "react";
import {supabase} from "../client"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    // Sign up

    const signUpNewUser = async (email, password) => {
      const {data, error}   = await supabase.auth.signUp({
        email: email,
        password: password,
      })
    

    if(error) {
        console.error("there was a problem signing up:");
        return {success: false, error}
    }
    return {success: true, data}
}
    // Sign in
    const signInUser = async ( email, password ) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.error("sign in error occurred:")
                return{ success: false, error: error.message }     
            }
            console.log("sign-in success")
            return { success: true, data}
        }
        catch(error) {
            console.error("An error occurred" )
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        });
    },[]);

    // Sign Out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if(error){
            console.error("there was an error")
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}