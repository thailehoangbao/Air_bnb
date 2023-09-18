import { GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_FAIL } from "./constants";
import api from "Utils/apiUtils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const actFetchAuth = (user, navigate) => {
    const MySwal = withReactContent(Swal);
    return (dispatch) => {
        dispatch(actAuthRequest());
        api
            .post(`auth/signin`, user)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    const user = res.data.content.user;
                    const token = res.data.content.token;
                    if (user.role !== "ADMIN") {
                        MySwal.fire({
                            title: "Bạn không có quyền truy cập!",
                            icon: "error"
                        })
                        // return Promise.reject();

                    } else {
                        MySwal.fire({
                            title: "Đăng nhập thành công!",
                            icon: "success"
                        })
                        dispatch(actAuthSuccess(user));
                        localStorage.setItem('USER_LOGIN', JSON.stringify(user));
                        localStorage.setItem('token', JSON.stringify(token));
                        navigate("/admin/user", { replace: true });
                    }
                   
                }
            })
            .catch((error) => {
                MySwal.fire({
                    title: "Email hoặc mật khẩu không đúng!",
                    icon: "error"
                })
                dispatch(actAuthFail(error));

            })
    }
};
const actAuthRequest = () => {
    return {
        type: GET_AUTH_REQUEST,
    };
};

const actAuthSuccess = (data) => {
    return {
        type: GET_AUTH_SUCCESS,
        payload: data,
    };
};

const actAuthFail = (error) => {
    return {
        type: GET_AUTH_FAIL,
        payload: error
    };
};