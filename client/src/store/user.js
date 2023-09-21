import {create} from "zustand"
import {devtools} from "zustand/middleware";

const logger = (config) => (set, get, api) =>
    config(
        (args) => {
            console.log("User Action:", args);
            set(args);
            console.log("User New state:", get());
        },
        get,
        api
    );
export  const useUserStore = create(devtools(logger(
    (setter) => ({
        user:null,
        allUsers:[],
        isAuthenticated : false,
        isUserOwner : false,
        setUser:(userToSet) => setter((state)=>({
            user : userToSet
        })),
        setUserOwner : () => setter((state) => ({
            isUserOwner: true
        })),
        setAllUsers:(users) => setter((state) => ({
           allUsers : users
        })),
        setAuthenticated : (isAuth) => setter(state => ({isAuthenticated : isAuth}))
    }
    ))));
