import * as actionTypes from '../actions';

const initialState = {
    quizModal: false
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionTypes.QUIZ_MODAL:
            console.log("MODAL");
            return {
                ...state,
                quizModal: !this.state.quizModal
            }
        default:
            return state;

    }

   
}

export default reducer;