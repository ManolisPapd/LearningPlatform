import * as actionTypes from '../actions';

const initialState = {
    helperModal: null
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.HELPER_MODAL:
            console.log("MEGAMAN: HELPER MODAL ACTIVATED");
            console.log(action.payload);
            return {
                ...state,
                helperModal: action.payload.helperModal
            }
        default:
            return state;

    }

   
}

export default reducer;