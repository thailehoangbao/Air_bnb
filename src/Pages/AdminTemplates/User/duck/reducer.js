import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from "./constants";

const initialState = {
    loadingFetch: false,
    dataFetch: null,
    errorFetch: null,

    loadingGet: false,
    dataGet: null,
    errorGet: null,

    loadingAdd: false,
    dataAdd: null,
    errorAdd: null,

    loadingUpdate: false,
    dataUpdate: null,
    errorUpdate: null,

    loadingDelete: false,
    dataDelete: null,
    errorDelete: null,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            state.loadingFetch = true;
            state.dataFetch = null;
            state.errorFetch = null;
            return { ...state };

        case FETCH_USER_SUCCESS:
            state.loadingFetch = false;
            state.dataFetch = action.payload;
            state.errorFetch = null;
            return { ...state };

        case FETCH_USER_FAIL:
            state.loadingFetch = false;
            state.dataFetch = null;
            state.errorFetch = action.payload;
            return { ...state };

        case ADD_USER_REQUEST:
            state.loadingAdd = true;
            state.dataAdd = null;
            state.errorAdd = null;
            return { ...state };

        case ADD_USER_SUCCESS:
            state.loadingAdd = false;
            state.dataAdd = action.payload;
            state.errorAdd = null;
            return { ...state };

        case ADD_USER_FAIL:
            state.loadingAdd = false;
            state.dataAdd = null;
            state.errorAdd = action.payload;
            return { ...state };

        case GET_USER_REQUEST:
            state.loadingGet = true;
            state.dataGet = null;
            state.errorGet = null;
            return { ...state };

        case GET_USER_SUCCESS:
            state.loadingGet = false;
            state.dataGet = action.payload;
            state.errorGet = null;
            return { ...state };

        case GET_USER_FAIL:
            state.loadingGet = false;
            state.dataGet = null;
            state.errorGet = action.payload;
            return { ...state };

            case UPDATE_USER_REQUEST:
            state.loadingUpdate = true;
            state.dataUpdate = null;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_USER_SUCCESS:
            state.loadingUpdate = false;
            state.dataUpdate = action.payload;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_USER_FAIL:
            state.loadingUpdate = false;
            state.dataUpdate = null;
            state.errorUpdate = action.payload;
            return { ...state };

            case DELETE_USER_REQUEST:
            state.loadingDelete = true;
            state.dataDelete = null;
            state.errorDelete = null;
            return { ...state };

        case DELETE_USER_SUCCESS:
            state.loadingDelete = false;
            state.dataDelete = action.payload;
            state.errorDelete = null;
            return { ...state };

        case DELETE_USER_FAIL:
            state.loadingDelete = false;
            state.dataDelete = null;
            state.errorDelete = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
export default userReducer;