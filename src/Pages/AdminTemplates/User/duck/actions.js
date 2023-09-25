import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from "./constants";
import api from "Utils/apiUtils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const actFetchUser = () => {
    return (dispatch) => {
        dispatch(actFetchUserRequest());
        api
            .get(`users`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content;
                    dispatch(actFetchUserSuccess(user));
                }
            })
            .catch((error) => {
                dispatch(actFetchUserFail(error));
            })
    }
};

export const actAddUser = (user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actAddUserRequest());
        api
            .post(`users`, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã thêm mới thành công!",
                        icon: "success"
                    })
                    const user = res.data.content.user;
                    dispatch(actAddUserSuccess(user));
                    dispatch(actFetchUser());
                }
            })
            .catch((error) => {
                MySwal.fire({
                    title: "Email hoặc mật khẩu đã tồn tại!",
                    icon: "error"
                })
                dispatch(actAddUserFail(error));
            })
    }
};

export const actGetUser = (id) => {
    return (dispatch) => {
        dispatch(actGetUserRequest);
        api
        .get(`users/` + id)
        .then((res) => {
            if(res.data.statusCode === 200){
                const user = res.data.content;
                dispatch(actGetUserSuccess(user));
            }
        })
        .catch((error) => {
           dispatch(actGetUserFail(error)); 
        })
    }
};

export const actUpdateUser = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actUpdateUserRequest());
        api
            .put(`users/` + id, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    MySwal.fire({
                        title: "Bạn đã cập nhật thành công!",
                        icon: "success"
                    }).then(() => {
                        const user = res.data.content;
                    dispatch(actUpdateUserSuccess(user));
                    dispatch(actFetchUser());
                    })
                    }
            })
            .catch((error) => {
                dispatch(actUpdateUserFail(error));
            })
    }
};

export const actDeleteUser = (id, user) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actDeleteUserRequest());
        api
        .delete(`users?id=` + id, user)
        .then((res) => {
            if (res.data.statusCode === 200) {
                MySwal.fire({
                    title: "Bạn đã xóa thành công!",
                    icon: "success"
                }).then(() => {
                    const user = res.data.content;
                    dispatch(actDeleteUserSuccess(user));
                    dispatch(actFetchUser());
                })
                
            }
        })
        .catch((error) => {
            dispatch(actDeleteUserFail(error));
        })
        
    }
};

export const actSearchUser = (name, user) => {
    return (dispatch) => {
        dispatch(actSearchUserRequest());
        api
        .get(`/users/search/` + name, user)
        .then((res) => {
            if(res.data.statusCode === 200) {
                const user = res.data.content;
                dispatch(actSearchUserSuccess(user));
            }
        })
        .catch((error) => {
            dispatch(actSearchUserFail(error));
        })
    }
};

const actFetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    };
};
const actFetchUserSuccess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data,
    };
};

const actFetchUserFail = (error) => {
    return {
        type: FETCH_USER_FAIL,
        payload: error
    };
};

const actAddUserRequest = () => {
    return {
        type: ADD_USER_REQUEST
    };
};
const actAddUserSuccess = (data) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: data,
    };
};

const actAddUserFail = (error) => {
    return {
        type: ADD_USER_FAIL,
        payload: error
    };
};

const actUpdateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST
    };
};
const actUpdateUserSuccess = (data) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: data,
    };
};

const actUpdateUserFail = (error) => {
    return {
        type: UPDATE_USER_FAIL,
        payload: error
    };
};

const actGetUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    };
};
const actGetUserSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload: data,
    };
};

const actGetUserFail = (error) => {
    return {
        type: GET_USER_FAIL,
        payload: error
    };
};

const actDeleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST
    };
};
const actDeleteUserSuccess = (data) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: data,
    };
};

const actDeleteUserFail = (error) => {
    return {
        type: DELETE_USER_FAIL,
        payload: error
    };
};

const actSearchUserRequest = () => {
    return {
        type: SEARCH_USER_REQUEST
    };
};
const actSearchUserSuccess = (data) => {
    return {
        type: SEARCH_USER_SUCCESS,
        payload: data,
    };
};

const actSearchUserFail = (error) => {
    return {
        type: SEARCH_USER_FAIL,
        payload: error
    };
};