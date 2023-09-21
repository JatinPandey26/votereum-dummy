export function makeContestObjectArray(contestArray) {
    let contestObjectArray = [];

    for(let i = 0 ; i < contestArray.length ; i++){
        let contest = contestArray[i];
        if(contest.length < 7) return null;
        const contestObject = {
            title : contest[0],
            participants : contest[1],
            requestParticipants:contest[2],
            isContestStarted:contest[7]
        }
        contestObjectArray.push(contestObject);
    }

    return contestObjectArray;
}