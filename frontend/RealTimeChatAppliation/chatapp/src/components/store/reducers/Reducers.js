
export const fileReducer = (state={login: "false", profileImageUrl: "NoUrl"},action='None')=>{
    switch(action.type){
        case 'ADD':
            return {...state,login: action.payload.login,profileImageUrl: action.payload.imgUrl}
    }
}
