import {useContestStore} from "../store/contest.js";

export default  function ContestBoard () {
    const{allContest,setAllContest} = useContestStore()
    return <>
    <h2>Contest Board</h2>
        {
            allContest.map(contest => {
                return (
                    <div className="contestCard">
                        contest name: {contest.title}
                        <button>edit</button>
                    </div>
                )
            })
        }
    </>
}