import {create} from "zustand"
import {devtools} from "zustand/middleware";

const logger = (config) => (set, get, api) =>
    config(
        (args) => {
            console.log("Contract Action:", args);
            set(args);
            console.log("Contract New state:", get());
        },
        get,
        api
    );
export  const useContractStore = create(devtools(logger(
    (setter) => ({
            contractState : {
                provider: null,
                signer: null,
                userContract: null,
                votingContract : null
            },
            setContractState : (newContractState) => setter((state)=>({
                contractState : newContractState
            }))}
    ))));
