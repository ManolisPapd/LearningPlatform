import * as actionTypes from '../actions';

const initialState = {
    helperModal: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.HELPER_MODAL:
            console.log("MEGAMAN: HELPER MODAL ACTIVATED");
            return {
                ...state,
                helperModal: action.payload.number
            }
        default:
            return state;

    }

   
}

export default reducer;