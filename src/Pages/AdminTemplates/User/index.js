import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Table, Modal } from 'antd';
import {
  EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { actAddUser, actDeleteUser, actFetchUser, actGetUser, actUpdateUser } from './duck/actions';
import { useDispatch, useSelector } from 'react-redux';
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function User() {
  const dataFetch = useSelector((state) => state.userReducer.dataFetch);
  const dataGet = useSelector((state) => state.userReducer.dataGet);
  const dispatch = useDispatch();
  const [stateIsAdd, setStateIsAdd] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  useEffect(() => {
    dispatch(actFetchUser());
    if (stateIsAdd) {
      setCurrentId(-1);
      setStateForm({
        name: "",
        email: "",
        password: "",
        birthday: "",
        gender: true,
        role: "ADMIN",
      });
      setState({
        errors: {
          name: "",
          email: "",
          password: "",
          birthday: "",
        },
        nameValid: false,
        emailValid: false,
        passwordValid: false,
        birthdayValid: false,

        formValid: false,
      });
    } else {
      if (dataGet) {
        setCurrentId(dataGet.id);
        setStateForm({
          name: dataGet.name,
          email: dataGet.email,
          birthday: dataGet.birthday,
          gender: dataGet.gender,
          role: dataGet.role,
        });
      }
      setState({
        errors: {
          name: "",
          email: "",
          password: "",
          birthday: "",
        },
        nameValid: true,
        emailValid: true,
        passwordValid: true,
        birthdayValid: true,

        formValid: true,
      })
    }
  }, [dataGet, stateIsAdd]);

  const [stateForm, setStateForm] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: true,
    role: "ADMIN",
  });

  const [state, setState] = useState({
    errors: {
      name: "",
      email: "",
      password: "",
      birthday: "",
    },
    nameValid: false,
    emailValid: false,
    passwordValid: false,
    birthdayValid: false,

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

  const handleUser = (e) => {
    e.preventDefault();
    if (stateIsAdd) {
      dispatch(actAddUser(stateForm));
    } else {
      dispatch(actUpdateUser(currentId, stateForm));
    }
  };

  const handleDelete = (id) => {
    dispatch(actDeleteUser(id));
  }

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() ? "" : "Vui lòng nhập trường này!";
    let { nameValid, emailValid, passwordValid, birthdayValid, } = state;

    switch (name) {
      case "name":
        nameValid = mess === '' ? true : false;
        break;
      case "email":
        emailValid = mess === "" ? true : false;
        if (value && !value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/)) {
          mess = "Vui lòng nhập email đúng định dạng!";
          emailValid = false;
        }
        break;
      case 'password':
        passwordValid = mess === "" ? true : false;
        if (value && !value.match(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/)) {
          mess = "Mật khẩu từ 8 ký tự trở lên bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt";
          passwordValid = false;
        }
        break;
      case "birthday":
        birthdayValid = mess === '' ? true : false;
        break;
      default:
        break;
    }
    setState({
      errors: { ...state.errors, [name]: mess },
      nameValid,
      emailValid,
      passwordValid,
      birthdayValid,

      formValid: nameValid && emailValid && passwordValid && birthdayValid
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Birthday',
      key: 'birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Gender',
      key: 'gender',
      render: (_, record) => (
        record.gender ? "MALE" : "FEMALE"
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined className='p-2 text-green-600 text-lg text-right' onClick={() => showModal(false, record.id)} /></a>
          <a><DeleteOutlined className='p-2 text-red-700 text-lg text-right' onClick={() => handleDelete(record.id)} /></a>
        </Space>
      ),
    },
  ];

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (isAdd, id) => {
    setIsModalOpen(true);
    if (isAdd) {
      setStateIsAdd(true);
    } else {
      setStateIsAdd(false);
      dispatch(actGetUser(id))
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='user'>
      <div className='container '>
        <h1 className='text-2xl mb-3 font-medium'>User management</h1>
        <div className='flex justify-end mb-3'>
          <Search
            className='bg-blue-600 rounded-lg w-4/5 sm:w-1/2 md:w-2/5'
            placeholder="input the username"
            onSearch={onSearch}
            enterButton
            size={"large"} />
          <Button size={"large"} className='ml-3 font-medium bg-blue-600 text-white' onClick={() => showModal(true, -1)}>Add users</Button>
        </div>
        <Table columns={columns} dataSource={dataFetch} />
      </div>

      <div>
        <Modal title={stateIsAdd ? "Add users" : "Edit information"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[null]}
        >
          <form className='mt-4 text-gray-900'>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" type="text" name='name' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.name} />
              <span className='text-danger'>{state.errors.name}</span>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="text" name='email' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.email} />
              <span className='text-danger'>{state.errors.email}</span>
            </div>
            {stateIsAdd ? <div className="form-group" >
              <label>Password</label>
              <input className="form-control" type='password' name='password' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} />
              <span className='text-danger'>{state.errors.password}</span>
            </div> : ""}
            <div className="form-group">
              <label>Birthday</label>
              <input className="form-control" type='' name='birthday' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.birthday} />
              <span className='text-danger'>{state.errors.birthday}</span>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select className='form-control' name="gender" onChange={(e) => handleOnchange(e)} value={stateForm.gender}>
                <option value="true">MALE</option>
                <option value="false">FEMALE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Role</label>
              <select className='form-control' name="role" onChange={(e) => handleOnchange(e)} value={stateForm.role}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='text-right'>
              <button type='submit' className='btn bg-blue-600 font-medium text-white ' size={"large"} onClick={(e) => handleUser(e)} disabled={!state.formValid} >{stateIsAdd ? "Add" : "Update"} </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
};
