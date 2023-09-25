import { GET_ROOM_REQUEST, GET_ROOM_SUCCESS, GET_ROOM_FAIL, ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS, ADD_ROOM_FAIL, FETCH_ROOM_REQUEST, FETCH_ROOM_SUCCESS, FETCH_ROOM_FAIL, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS, UPDATE_ROOM_FAIL, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS, DELETE_ROOM_FAIL } from "./constants";
import api from "Utils/apiUtils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const actFetchRoom = () => {
    return (dispatch) => {
        dispatch(actFetchRoomRequest());
        api
            .get(`phong-thue`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actFetchRoomSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actFetchRoomFail(error));
            })
    }
};

export const actAddRoom = (user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actAddRoomRequest());
        api
            .post(`phong-thue`, user)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    MySwal.fire({
                        title: "Bạn đã thêm mới thành công!",
                        icon: "success"
                    })
                    const user = res.data.content.user;
                    dispatch(actAddRoomSuccess(user));
                    dispatch(actFetchRoom());
                }
            })
            .catch((error) => {
                dispatch(actAddRoomFail(error));
            })
    }
};

export const actGetRoom = (id) => {
    return (dispatch) => {
        dispatch(actGetRoomRequest());
        api
            .get(`phong-thue/` + id)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actGetRoomSuccess(user))
                }
            })
            .catch((error) => {
                dispatch(actGetRoomFail(error));
            })
    }
};

export const actUpdateRoom = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actUpdateRoomRequest());
        api
        .put(`phong-thue/` + id, user)
        .then((res) => {
            if(res.data.statusCode === 200) {
                MySwal.fire({
                    title: "Bạn đã cập nhật thành công!",
                    icon: "success"
                }).then(() => {
                    const user = res.data.content;
                    dispatch(actUpdateRoomSuccess(user));
                    dispatch(actFetchRoom());
                })
            }
        })
        .catch((error) => {
            dispatch(actUpdateRoomFail(error));
        })
    }
};

export const actDeleteRoom = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actDeleteRoomRequest());
        api
        .delete(`phong-thue/` + id, user)
        .then((res) => {
            if(res.data.statusCode === 200) {
                MySwal.fire({
                    title:"Bạn đã xóa thành công!",
                    icon: "success"
                }).then(() => {
                    const user = res.data.content;
                    dispatch(actDeleteRoomSuccess(user));
                    dispatch(actFetchRoom());
                })
            }
        })
        .catch((error) => {
            dispatch(actDeleteRoomFail(error));
        })
    }
};

const actFetchRoomRequest = () => {
    return {
        type: FETCH_ROOM_REQUEST
    };
};
const actFetchRoomSuccess = (data) => {
    return {
        type: FETCH_ROOM_SUCCESS,
        payload: data,
    };
};

const actFetchRoomFail = (error) => {
    return {
        type: FETCH_ROOM_FAIL,
        payload: error
    };
};

const actAddRoomRequest = () => {
    return {
        type: ADD_ROOM_REQUEST
    };
};
const actAddRoomSuccess = (data) => {
    return {
        type: ADD_ROOM_SUCCESS,
        payload: data,
    };
};

const actAddRoomFail = (error) => {
    return {
        type: ADD_ROOM_FAIL,
        payload: error
    };
};

const actGetRoomRequest = () => {
    return {
        type: GET_ROOM_REQUEST
    };
};
const actGetRoomSuccess = (data) => {
    return {
        type: GET_ROOM_SUCCESS,
        payload: data,
    };
};

const actGetRoomFail = (error) => {
    return {
        type: GET_ROOM_FAIL,
        payload: error
    };
};

const actUpdateRoomRequest = () => {
    return {
        type: UPDATE_ROOM_REQUEST
    };
};
const actUpdateRoomSuccess = (data) => {
    return {
        type: UPDATE_ROOM_SUCCESS,
        payload: data,
    };
};

const actUpdateRoomFail = (error) => {
    return {
        type: UPDATE_ROOM_FAIL,
        payload: error
    };
};

const actDeleteRoomRequest = () => {
    return {
        type: DELETE_ROOM_REQUEST
    };
};
const actDeleteRoomSuccess = (data) => {
    return {
        type: DELETE_ROOM_SUCCESS,
        payload: data,
    };
};

const actDeleteRoomFail = (error) => {
    return {
        type: DELETE_ROOM_FAIL,
        payload: error
    };
};