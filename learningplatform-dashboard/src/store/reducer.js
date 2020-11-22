import * as actionTypes from './actions';

const initialState = {
    token: null,
    quizModal: false,
    helperModal: null

}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.TOKEN_FILLER:
            console.log("#######################");
            console.log(action.payload);
            return {
                token: action.payload.token
            }
        case actionTypes.QUIZ_MODAL:
            return {
                quizModal: !this.state.quizModal
            }
        case actionTypes.HELPER_MODAL:
            console.log("HELPER MODAL ACTIVATED");
            console.log(action.payload);
            return {
                helperModal: action.payload.helperModal
            }
        default:
            return state;

    }

   
}

export default reducer;