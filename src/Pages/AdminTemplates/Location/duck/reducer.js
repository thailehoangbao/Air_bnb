import { FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_FAIL, GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAIL, ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS, ADD_LOCATION_FAIL, UPDATE_LOCATION_REQUEST, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAIL, DELETE_LOCATION_REQUEST, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_FAIL  } from "./constants";

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
const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOCATION_REQUEST:
            state.loadingFetch = true;
            state.dataFetch = null;
            state.errorFetch = null;
            return { ...state };

        case FETCH_LOCATION_SUCCESS:
            state.loadingFetch = false;
            state.dataFetch = action.payload;
            state.errorFetch = null;
            return { ...state };

        case FETCH_LOCATION_FAIL:
            state.loadingFetch = false;
            state.dataFetch = null;
            state.errorFetch = action.payload;
            return { ...state };

        case ADD_LOCATION_REQUEST:
            state.loadingAdd = true;
            state.dataAdd = null;
            state.errorAdd = null;
            return { ...state };

        case ADD_LOCATION_SUCCESS:
            state.loadingAdd = false;
            state.dataAdd = action.payload;
            state.errorAdd = null;
            return { ...state };

        case ADD_LOCATION_FAIL:
            state.loadingAdd = false;
            state.dataAdd = null;
            state.errorAdd = action.payload;
            return { ...state };

        case GET_LOCATION_REQUEST:
            state.loadingGet = true;
            state.dataGet = null;
            state.errorGet = null;
            return { ...state };

        case GET_LOCATION_SUCCESS:
            state.loadingGet = false;
            state.dataGet = action.payload;
            state.errorGet = null;
            return { ...state };

        case GET_LOCATION_FAIL:
            state.loadingGet = false;
            state.dataGet = null;
            state.errorGet = action.payload;
            return { ...state };

            case UPDATE_LOCATION_REQUEST:
            state.loadingUpdate = true;
            state.dataUpdate = null;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_LOCATION_SUCCESS:
            state.loadingUpdate = false;
            state.dataUpdate = action.payload;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_LOCATION_FAIL:
            state.loadingUpdate = false;
            state.dataUpdate = null;
            state.errorUpdate = action.payload;
            return { ...state };

            case DELETE_LOCATION_REQUEST:
            state.loadingDelete = true;
            state.dataDelete = null;
            state.errorDelete = null;
            return { ...state };

        case DELETE_LOCATION_SUCCESS:
            state.loadingDelete = false;
            state.dataDelete = action.payload;
            state.errorDelete = null;
            return { ...state };

        case DELETE_LOCATION_FAIL:
            state.loadingDelete = false;
            state.dataDelete = null;
            state.errorDelete = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
export default locationReducer;