import * as actionTypes from '../actions';

const initialState = {
    token: null
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.TOKEN_FILLER:
            console.log("#######################");
            console.log(action.payload);
            return {
                ...state,
                token: action.payload.token
            }
        default:
            return state;

    }

   
}

export default reducer;