import {useUserStore} from "../store/user.js";
import {useState} from "react";
import {useContractStore} from "../store/contract.js";
import {useContestStore} from "../store/contest.js";
import {makeContestObjectArray} from "../utils/makeContestObject.js";
import ContestBoard from "./ContestBoard.jsx";

export default function CreateContest () {
    const {} = useUserStore(state => state);
    const {contractState} = useContractStore(state => state)
    const [title,setTitle] = useState("")
    const [participants,setParticipants] = useState([])
    const{allContest,setAllContest} = useContestStore()
    async function createContest(e) {
        e.preventDefault();
        // console.log("votingContract",contractStore)
        const response = await contractState?.votingContract?.createContest(title,participants);
        setAllContest(makeContestObjectArray(await contractState?.votingContract?.getAllContests()))
    }

    console.log(allContest)

    return <>
    <h2>Create Contest</h2>
    <form onSubmit={createContest}>
        <label>Contest Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>

        <button type={"submit"}>Create</button>

    </form>
        <ContestBoard></ContestBoard>
    </>
}