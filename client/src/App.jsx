import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import './App.css'

import userAbi from "./contracts/user.json"
import votingAbi from "./contracts/voting.json"
import Authentication from "./components/Authentication.jsx";
import {useUserStore} from "./store/user.js";
import {makeUserObject} from "./utils/makeUserObject.js";
import CreateContest from "./components/CreateElection.jsx";
import {useContractStore} from "./store/contract.js";
import {useContestStore} from "./store/contest.js";
import {makeContestObjectArray} from "./utils/makeContestObject.js";


function App() {
    const {contractState,setContractState} = useContractStore(state=>state)

    const {user , setUser , isUserOwner , setUserOwner , isAuthenticated , setAuthenticated} = useUserStore(state => state)

    const{allContest,setAllContest} = useContestStore()

    const [account, setAccount] = useState(null)

    useEffect(() => {
        const connectWallet = async () => {
            const userContractAddress = "0x9e0a9614ED846598397E15C86b7C9ABEf5aA2fC2";
            const votingContractAddress = "0x91DC2398577D410Cc72651f342704929239d97f2";
            const userContractABI = userAbi.abi;
            const votingContractABI = votingAbi.abi;
            try {

                const { ethereum } = window;

                if (!ethereum) {
                    alert("Get MetaMask!");
                    return;
                }

                window.ethereum.on('chainChanged', () => { window.location.reload() })
                window.ethereum.on('accountsChanged', () => { window.location.reload() })

                const account = await ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();
                const userContract = new ethers.Contract(userContractAddress, userContractABI, signer);
                const votingContract = new ethers.Contract(votingContractAddress,votingContractABI,signer);
                setContractState({ provider, signer, userContract ,votingContract});
                setAccount(account);
            } catch (error) {
                console.log(error);
            }
        }



        connectWallet().then(() => console.log("Wallet Connected")).catch((e) => console.log(e.getMessage()));


    }, [])


    console.log("contract",contractState)
    useEffect(() => {
        async function verifyUser(){

            if(localStorage.getItem("votereumSigner")){
                const signer = JSON.parse(localStorage.getItem("votereumSigner"))
                const user = await contractState?.userContract?.login(signer.aadhaarNumber,signer.password);

                if(user) {
                    const UserObject = makeUserObject(user);
                    setUser(UserObject);
                    setAuthenticated(true);
                    setAllContest(makeContestObjectArray(await contractState?.votingContract?.getAllContests()))
                }
            }



        }

        async function isUserOwner(){
            const isOwner = contractState?.votingContract?.isOwner();
            if(isOwner) {
                setUserOwner();
            }
        }



        verifyUser().then(() => isUserOwner());
    }, [contractState]);

    const logout = () => {
        localStorage.clear("votereumSigner")
        window.location.reload()
    }
    return (

        <>
            <h1>VOTEREUM</h1>
            {isAuthenticated && <button onClick={logout}>Logout</button>}
            {
                isAuthenticated ? <>welcome</> : <Authentication />
            }
            {
                isUserOwner && <CreateContest/>
            }
        </>
    )
}

export default App
