import { GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS, GET_BOOKING_FAIL, ADD_BOOKING_REQUEST, ADD_BOOKING_SUCCESS, ADD_BOOKING_FAIL, FETCH_BOOKING_REQUEST, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_FAIL, UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS, UPDATE_BOOKING_FAIL, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAIL } from "./constants";
import api from "Utils/apiUtils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const actFetchBooking = () => {
    return (dispatch) => {
        dispatch(actFetchBookingRequest());
        api
            .get(`dat-phong`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actFetchBookingSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actFetchBookingFail(error));
            })
    }
};

export const actAddBooking = (user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actAddBookingRequest());
        api
            .post(`dat-phong`, user)
            .then((res) => {
                if (res.data.statusCode === 201) {
                    MySwal.fire({
                        title: "Bạn đã thêm mới thành công!",
                        icon: "success"
                    })
                    const user = res.data.content.user;
                    dispatch(actAddBookingSuccess(user));
                    dispatch(actFetchBooking());
                }
            })
            .catch((error) => {
                dispatch(actAddBookingFail(error));
            })
    }
};

export const actGetBooking = (id) => {
    return (dispatch) => {
        dispatch(actGetBookingRequest());
        api
            .get(`dat-phong/` + id)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actGetBookingSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actGetBookingFail(error));
            })
    }
};

export const actUpdateBooking = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actUpdateBookingRequest());
        api
            .put(`dat-phong/` + id, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã cập nhật thành công!",
                        icon: "success"
                    }).then(() => {
                        const user = res.data.content;
                        dispatch(actUpdateBookingSuccess(user));
                        dispatch(actFetchBooking());
                    })
                }
            })
            .catch((error) => {
                dispatch(actUpdateBookingFail(error));
            })
    }
};

export const actDeleteBooking = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actDeleteBookingRequest());
        api
            .delete(`dat-phong/` + id, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã xóa thành công!",
                        icon: "success"
                    }).then(() => {
                        const user = res.data.content;
                        dispatch(actDeleteBookingSuccess(user));
                        dispatch(actFetchBooking());
                    })
                }
            })
            .catch((error) => {
                dispatch(actDeleteBookingFail(error));
            })
    }
};

const actFetchBookingRequest = () => {
    return {
        type: FETCH_BOOKING_REQUEST
    };
};
const actFetchBookingSuccess = (data) => {
    return {
        type: FETCH_BOOKING_SUCCESS,
        payload: data,
    };
};

const actFetchBookingFail = (error) => {
    return {
        type: FETCH_BOOKING_FAIL,
        payload: error
    };
};

const actAddBookingRequest = () => {
    return {
        type: ADD_BOOKING_REQUEST
    };
};
const actAddBookingSuccess = (data) => {
    return {
        type: ADD_BOOKING_SUCCESS,
        payload: data,
    };
};

const actAddBookingFail = (error) => {
    return {
        type: ADD_BOOKING_FAIL,
        payload: error
    };
};

const actGetBookingRequest = () => {
    return {
        type: GET_BOOKING_REQUEST
    };
};
const actGetBookingSuccess = (data) => {
    return {
        type: GET_BOOKING_SUCCESS,
        payload: data,
    };
};

const actGetBookingFail = (error) => {
    return {
        type: GET_BOOKING_FAIL,
        payload: error
    };
};

const actUpdateBookingRequest = () => {
    return {
        type: UPDATE_BOOKING_REQUEST
    };
};
const actUpdateBookingSuccess = (data) => {
    return {
        type: UPDATE_BOOKING_SUCCESS,
        payload: data,
    };
};

const actUpdateBookingFail = (error) => {
    return {
        type: UPDATE_BOOKING_FAIL,
        payload: error
    };
};

const actDeleteBookingRequest = () => {
    return {
        type: DELETE_BOOKING_REQUEST
    };
};
const actDeleteBookingSuccess = (data) => {
    return {
        type: DELETE_BOOKING_SUCCESS,
        payload: data,
    };
};

const actDeleteBookingFail = (error) => {
    return {
        type: DELETE_BOOKING_FAIL,
        payload: error
    };
};