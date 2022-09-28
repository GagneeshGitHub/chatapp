export default function Actions(value,payload){
    const actionVar = {type: 'Nothing',payload}

    switch (value){
        case 'ADDING':
            return {...actionVar,type: 'ADD'}
        case 'REMOVE':
            return {...actionVar,type: 'REM'}
        default:
            return actionVar
    }
}