const reducer = (initialState) => (state=initialState, action)  => {
    switch (action.type) {
        case 'SET_SUBJECT':
            state={
                ...state,
                subject: action.payload 
            }
            console.log(state);
            
        case 'SET_TAGSINPUT':
            state={
                ...state,
                tagsInput: action.payload
            }
            console.log(action.payload);
            
        default:
            return state
    }
}

export default reducer;