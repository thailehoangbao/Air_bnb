import { GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_FAIL } from "./constants";

const initialState = {
    loading: false,
    data: null,
    error: null,
}
 const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;
            return {...state};
        
        case GET_AUTH_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return {...state};
        
        case GET_AUTH_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {...state};
        
        default:
            return {...state};
    }
 };
 export default authReducer;