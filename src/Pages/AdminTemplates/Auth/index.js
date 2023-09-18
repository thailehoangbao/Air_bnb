import React, {useState} from 'react';
import "./style.css";
import { actFetchAuth } from "./duck/actions";
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ stateForm, setStateForm ] = useState({
    email:"",
    password:""
  });
  const [ state, setState ] = useState({
    errors:{
      email:"",
      password:""
    },
    emailValid: false,
    passwordValid: false,

    formValid: false,
  });
  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };
  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(actFetchAuth(stateForm, navigate));
  };
  const handleValidation = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() ? "" : "Vui lòng nhập trường này!";
    let { emailValid, passwordValid } = state;

    switch (name) {
      case "email":
        emailValid = mess === "" ? true : false;
        if (value && !value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/)) {
          mess = "Vui lòng nhập email đúng định dạng!";
          emailValid = false;
        }
        break;
      case "password":
        passwordValid = mess === "" ? true : false;
        if (value && !value.match(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/)) {
          mess = "Mật khẩu từ 8 ký tự trở lên bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt";
          passwordValid = false;
        }
        break;
      default:
        break;
    }
    setState({
      errors: { ...state.errors, [name]: mess },
      emailValid,
      passwordValid,
      formValid: emailValid && passwordValid
    });
  };

  if(localStorage.getItem('USER_LOGIN')){
    return <Navigate replace to="/admin/user" />;
}

  return (
    <div className='auth w-screen h-screen py-5'>
      <div className='auth-child container w-4/5 sm:w-1/2 md:w-2/5 py-5'>
        <form className='px-10 py-10 bg-white rounded-lg border border-gray-500' onSubmit={(e) => handleAuth(e)}>
          <h4 className='font-medium text-3xl text-blue-800 text-center pb-3'>Đăng nhập</h4>
          <div className="form-group">
            <label className='font-medium'>Email</label>
            <input type="text" name="email" className="form-control" onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)}/>
            <span className='text-danger'>{state.errors.email}</span>
          </div>
          <div className="form-group">
          <label className='font-medium'>Mật khẩu</label>
            <input type="password" name="password"  className="form-control" onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)}/>
            <span className='text-danger'>{state.errors.password}</span>
          </div>
          <button type='submit' disabled={!state.formValid} className='btn bg-red-500 text-white w-full font-medium py-2 mt-3'>Đăng nhập</button>
        </form>

      </div>
    </div>
  )
};

