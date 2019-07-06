const reducer = (initialState) => (state=initialState, action)  => {
    switch (action.type) {
        case 'SET_SUBJECT':
            state={
                ...state,
                subject: action.payload 
            }
            return state
            
        case 'SET_TAGSINPUT':
            state={
                ...state,
                tagsInput: action.payload
            }
            return state
            
        case 'SET_VISIBLEINPUTDRAWER':
            state={
                ...state,
                visibleInputDrawer: action.payload
            }
            return state

        case 'SET_VISIBLESIGNIN':
            state={
                ...state,
                visibleSignIn: action.payload
            }
            return state
            
        case 'SET_USER':
            console.log('payload user: ', action.payload);
            state={
                ...state,
                user: action.payload
            }
            return state
            
        default:
            return state
    }
}

export default reducer;