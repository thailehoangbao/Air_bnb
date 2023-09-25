import { GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS, GET_BOOKING_FAIL, ADD_BOOKING_REQUEST, ADD_BOOKING_SUCCESS, ADD_BOOKING_FAIL, FETCH_BOOKING_REQUEST, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_FAIL, UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS, UPDATE_BOOKING_FAIL, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAIL } from "./constants";

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

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKING_REQUEST:
            state.loadingFetch = true;
            state.dataFetch = null;
            state.errorFetch = null;
            return { ...state };

        case FETCH_BOOKING_SUCCESS:
            state.loadingFetch = false;
            state.dataFetch = action.payload;
            state.errorFetch = null;
            return { ...state };

        case FETCH_BOOKING_FAIL:
            state.loadingFetch = false;
            state.dataFetch = null;
            state.errorFetch = action.payload;
            return { ...state };

        case ADD_BOOKING_REQUEST:
            state.loadingAdd = true;
            state.dataAdd = null;
            state.errorAdd = null;
            return { ...state };

        case ADD_BOOKING_SUCCESS:
            state.loadingAdd = false;
            state.dataAdd = action.payload;
            state.errorAdd = null;
            return { ...state };

        case ADD_BOOKING_FAIL:
            state.loadingAdd = false;
            state.dataAdd = null;
            state.errorAdd = action.payload;
            return { ...state };

        case GET_BOOKING_REQUEST:
            state.loadingGet = true;
            state.dataGet = null;
            state.errorGet = null;
            return { ...state };

        case GET_BOOKING_SUCCESS:
            state.loadingGet = false;
            state.dataGet = action.payload;
            state.errorGet = null;
            return { ...state };

        case GET_BOOKING_FAIL:
            state.loadingGet = false;
            state.dataGet = null;
            state.errorGet = action.payload;
            return { ...state };

            case UPDATE_BOOKING_REQUEST:
            state.loadingUpdate = true;
            state.dataUpdate = null;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_BOOKING_SUCCESS:
            state.loadingUpdate = false;
            state.dataUpdate = action.payload;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_BOOKING_FAIL:
            state.loadingUpdate = false;
            state.dataUpdate = null;
            state.errorUpdate = action.payload;
            return { ...state };

            case DELETE_BOOKING_REQUEST:
            state.loadingDelete = true;
            state.dataDelete = null;
            state.errorDelete = null;
            return { ...state };

        case DELETE_BOOKING_SUCCESS:
            state.loadingDelete = false;
            state.dataDelete = action.payload;
            state.errorDelete = null;
            return { ...state };

        case DELETE_BOOKING_FAIL:
            state.loadingDelete = false;
            state.dataDelete = null;
            state.errorDelete = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
export default bookingReducer;