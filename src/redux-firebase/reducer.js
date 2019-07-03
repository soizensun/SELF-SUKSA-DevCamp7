const reducer = (initialState) => (state=initialState, action)  => {
    switch (action.type) {
        case 'SET_SUBJECT':
            state={
                ...state,
                subject: action.payload 
            }
            
            
        case 'SET_TAGSINPUT':
            state={
                ...state,
                tagsInput: action.payload
            }
        
        case 'SET_VISIBLEINPUTDRAWER':
            state={
                ...state,
                visibleInputDrawer: action.payload
            }
            
        default:
            return state
    }
}

export default reducer;