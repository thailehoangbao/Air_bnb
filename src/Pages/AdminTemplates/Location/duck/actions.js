import { FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_FAIL, GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAIL, ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS, ADD_LOCATION_FAIL, UPDATE_LOCATION_REQUEST, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAIL, DELETE_LOCATION_REQUEST, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_FAIL } from "./constants";
import api from "Utils/apiUtils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const actFetchLocation = () => {
    return (dispatch) => {
        dispatch(actFetchLocationRequest());
        api
            .get(`vi-tri`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actFetchLocationSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actFetchLocationFail(error));
            })
    }
};

export const actAddLocation = (user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actAddLocationRequest());
        api
            .post(`vi-tri`, user)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    MySwal.fire({
                        title: "Bạn đã thêm mới thành công!",
                        icon: "success"
                    })
                    const user = res.data.content.user;
                    dispatch(actAddLocationSuccess(user));
                    dispatch(actFetchLocation());
                }
            })
            .catch((error) => {
                dispatch(actAddLocationFail(error));
            })
    }
};

export const actGetLocation = (id) => {
    return (dispatch) => {
        dispatch(actGetLocationRequest());
        api
            .get(`vi-tri/` + id)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actGetLocationSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actGetLocationFail(error));
            })
    }
};

export const actUpdateLocation = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actUpdateLocationRequest());
        api
            .put(`vi-tri/` + id, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã cập nhật thành công!",
                        icon: "success"
                    }).then(() => {
                        const user = res.data.content;
                        dispatch(actUpdateLocationSuccess(user));
                        dispatch(actFetchLocation());
                    })
                }
            })
            .catch((error) => {
                dispatch(actUpdateLocationFail(error));
            })
    }
};

export const actDeleteLocation = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actDeleteLocationRequest());
        api
            .delete(`vi-tri/` + id, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã xóa thành công!",
                        icon: "success"
                    }).then(() => {
                        const user = res.data.content;
                        dispatch(actDeleteLocationSuccess(user));
                        dispatch(actFetchLocation());
                    })
                }
            })
            .catch((error) => {
                dispatch(actDeleteLocationFail(error));
            })
    }
};

const actFetchLocationRequest = () => {
    return {
        type: FETCH_LOCATION_REQUEST
    };
};
const actFetchLocationSuccess = (data) => {
    return {
        type: FETCH_LOCATION_SUCCESS,
        payload: data,
    };
};

const actFetchLocationFail = (error) => {
    return {
        type: FETCH_LOCATION_FAIL,
        payload: error
    };
};

const actAddLocationRequest = () => {
    return {
        type: ADD_LOCATION_REQUEST
    };
};
const actAddLocationSuccess = (data) => {
    return {
        type: ADD_LOCATION_SUCCESS,
        payload: data,
    };
};

const actAddLocationFail = (error) => {
    return {
        type: ADD_LOCATION_FAIL,
        payload: error
    };
};

const actGetLocationRequest = () => {
    return {
        type: GET_LOCATION_REQUEST
    };
};
const actGetLocationSuccess = (data) => {
    return {
        type: GET_LOCATION_SUCCESS,
        payload: data,
    };
};

const actGetLocationFail = (error) => {
    return {
        type: GET_LOCATION_FAIL,
        payload: error
    };
};

const actUpdateLocationRequest = () => {
    return {
        type: UPDATE_LOCATION_REQUEST
    };
};
const actUpdateLocationSuccess = (data) => {
    return {
        type: UPDATE_LOCATION_SUCCESS,
        payload: data,
    };
};

const actUpdateLocationFail = (error) => {
    return {
        type: UPDATE_LOCATION_FAIL,
        payload: error
    };
};

const actDeleteLocationRequest = () => {
    return {
        type: DELETE_LOCATION_REQUEST
    };
};
const actDeleteLocationSuccess = (data) => {
    return {
        type: DELETE_LOCATION_SUCCESS,
        payload: data,
    };
};

const actDeleteLocationFail = (error) => {
    return {
        type: DELETE_LOCATION_FAIL,
        payload: error
    };
};