import { GET_ROOM_REQUEST, GET_ROOM_SUCCESS, GET_ROOM_FAIL, ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS, ADD_ROOM_FAIL, FETCH_ROOM_REQUEST, FETCH_ROOM_SUCCESS, FETCH_ROOM_FAIL, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS, UPDATE_ROOM_FAIL, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, DELETE_ROOM_FAIL } from "./constants";

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
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROOM_REQUEST:
            state.loadingFetch = true;
            state.dataFetch = null;
            state.errorFetch = null;
            return { ...state };

        case FETCH_ROOM_SUCCESS:
            state.loadingFetch = false;
            state.dataFetch = action.payload;
            state.errorFetch = null;
            return { ...state };

        case FETCH_ROOM_FAIL:
            state.loadingFetch = false;
            state.dataFetch = null;
            state.errorFetch = action.payload;
            return { ...state };

        case ADD_ROOM_REQUEST:
            state.loadingAdd = true;
            state.dataAdd = null;
            state.errorAdd = null;
            return { ...state };

        case ADD_ROOM_SUCCESS:
            state.loadingAdd = false;
            state.dataAdd = action.payload;
            state.errorAdd = null;
            return { ...state };

        case ADD_ROOM_FAIL:
            state.loadingAdd = false;
            state.dataAdd = null;
            state.errorAdd = action.payload;
            return { ...state };

        case GET_ROOM_REQUEST:
            state.loadingGet = true;
            state.dataGet = null;
            state.errorGet = null;
            return { ...state };

        case GET_ROOM_SUCCESS:
            state.loadingGet = false;
            state.dataGet = action.payload;
            state.errorGet = null;
            return { ...state };

        case GET_ROOM_FAIL:
            state.loadingGet = false;
            state.dataGet = null;
            state.errorGet = action.payload;
            return { ...state };

            case UPDATE_ROOM_REQUEST:
            state.loadingUpdate = true;
            state.dataUpdate = null;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_ROOM_SUCCESS:
            state.loadingUpdate = false;
            state.dataUpdate = action.payload;
            state.errorUpdate = null;
            return { ...state };

        case UPDATE_ROOM_FAIL:
            state.loadingUpdate = false;
            state.dataUpdate = null;
            state.errorUpdate = action.payload;
            return { ...state };

            case DELETE_ROOM_REQUEST:
            state.loadingDelete = true;
            state.dataDelete = null;
            state.errorDelete = null;
            return { ...state };

        case DELETE_ROOM_SUCCESS:
            state.loadingDelete = false;
            state.dataDelete = action.payload;
            state.errorDelete = null;
            return { ...state };

        case DELETE_ROOM_FAIL:
            state.loadingDelete = false;
            state.dataDelete = null;
            state.errorDelete = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};
export default roomReducer;