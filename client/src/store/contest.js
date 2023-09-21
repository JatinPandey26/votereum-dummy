import {create} from "zustand"
import {devtools} from "zustand/middleware";

const logger = (config) => (set, get, api) =>
    config(
        (args) => {
            console.log("Contest Action:", args);
            set(args);
            console.log("Contest New state:", get());
        },
        get,
        api
    );
export  const useContestStore = create(devtools(logger(
    (setter) => ({
            allContest:[],


            setAllContest:(contests) => setter((state) => ({
                allContest : contests
            }))

        }
    ))));
