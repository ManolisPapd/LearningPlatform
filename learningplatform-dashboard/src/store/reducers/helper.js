import * as actionTypes from '../actions';

const initialState = {
    helperModal: "This helper will be activated on syntax and logic errors."
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