import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchBooking, actAddBooking, actGetBooking, actUpdateBooking, actDeleteBooking } from './duck/actions';

export default function Booking() {
  const dataFetch = useSelector((state) => state.bookingReducer.dataFetch);
  const dataGet = useSelector((state) => state.bookingReducer.dataGet);
  const dispatch = useDispatch();
  const [stateIsAdd, setStateIsAdd] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  useEffect(() => {
    dispatch(actFetchBooking());
    if (stateIsAdd) {
      setCurrentId(-1);
      setStateForm({
        maPhong: "",
        ngayDen: "",
        ngayDi: "",
        soLuongKhach: "",
        maNguoiDung: ""
      });
      setState({
        errors: {
          maPhong: "",
          ngayDen: "",
          ngayDi: "",
          soLuongKhach: "",
          maNguoiDung: ""
        },
        maPhongValid: false,
        ngayDenValid: false,
        ngayDiValid: false,
        soLuongKhachValid: false,
        maNguoiDungValid: false,

        formValid: false,
      });
    } else {
      if (dataGet) {
        setCurrentId(dataGet.id);
        setStateForm({
          maPhong: dataGet.maPhong,
          ngayDen: dataGet.ngayDen,
          ngayDi: dataGet.ngayDi,
          soLuongKhach: dataGet.soLuongKhach,
          maNguoiDung: dataGet.maNguoiDung,
        })
      }
      setState({
        errors: {
          maPhong: "",
          ngayDen: "",
          ngayDi: "",
          soLuongKhach: "",
          maNguoiDung: ""
        },
        maPhongValid: true,
        ngayDenValid: true,
        ngayDiValid: true,
        soLuongKhachValid: true,
        maNguoiDungValid: true,

        formValid: true,
      })
    }
  }, [dataGet, stateIsAdd]);

  const [stateForm, setStateForm] = useState({
    maPhong: "",
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
    maNguoiDung: ""
  });

  const [state, setState] = useState({
    errors: {
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: ""
    },
    maPhongValid: false,
    ngayDenValid: false,
    ngayDiValid: false,
    soLuongKhachValid: false,
    maNguoiDungValid: false,

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

  const handleBooking = (e) => {
    e.preventDefault();
    if (stateIsAdd) {
      dispatch(actAddBooking(stateForm));
    } else {
      dispatch(actUpdateBooking(currentId, stateForm));
    }
  };

  const handleDelete = (id) => {
    dispatch(actDeleteBooking(id))
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() ? "" : "Vui lòng nhập trường này!";
    let { maPhongValid, ngayDenValid, ngayDiValid, soLuongKhachValid, maNguoiDungValid } = state;
    switch (name) {
      case "maPhong":
        maPhongValid = mess === '' ? true : false;
        break;
      case "ngayDen":
        ngayDenValid = mess === '' ? true : false;
        break;
      case "ngayDi":
        ngayDiValid = mess === '' ? true : false;
        break;
      case "soLuongKhach":
        soLuongKhachValid = mess === '' ? true : false;
        break;
      case "maNguoiDung":
        maNguoiDungValid = mess === '' ? true : false;
        break;
      default:
        break;
    }
    setState({
      errors: { ...state.errors, [name]: mess },
      maPhongValid,
      ngayDenValid,
      ngayDiValid,
      soLuongKhachValid,
      maNguoiDungValid,

      formValid: maPhongValid && ngayDenValid && ngayDiValid && soLuongKhachValid && maNguoiDungValid
    });
  }

  const formatDate = (da) => {
    const d = new Date(da);
    let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let month = (d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1);
    let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    return date + "-" + month + "-" + d.getFullYear() + " " + hours + ":" + min;
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      key: 'maPhong',
    },
    {
      title: 'Ngày đến',
      dataIndex: 'ngayDen',
      key: 'ngayDen',
      render: (_, record) => (
        <Space>
          <p>{formatDate(record.ngayDen)}</p>
        </Space>
      )
    },
    {
      title: 'Ngày đi',
      key: 'ngayDi',
      dataIndex: 'ngayDi',
      render: (_, record) => (
        <Space>
          <p>{formatDate(record.ngayDi)}</p>
        </Space>
      )
    },
    {
      title: 'Số Lượng Khách',
      key: 'soLuongKhach',
      dataIndex: 'soLuongKhach',
    },
    {
      title: 'Mã Người Dùng',
      key: 'maNguoiDung',
      dataIndex: 'maNguoiDung',
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
      setStateForm({
        maPhong: "",
        ngayDen: "",
        ngayDi: "",
        soLuongKhach: "",
        maNguoiDung: ""
      });
      setState({
        errors: {
          maPhong: "",
          ngayDen: "",
          ngayDi: "",
          soLuongKhach: "",
          maNguoiDung: ""
        },
        maPhongValid: false,
        ngayDenValid: false,
        ngayDiValid: false,
        soLuongKhachValid: false,
        maNguoiDungValid: false,
    
        formValid: false,
      })
    } else {
      setStateIsAdd(false);
      dispatch(actGetBooking(id))
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='location'>
      <div className='container'>
        <h1 className='text-2xl mb-3 font-medium'>Booking management</h1>
        <div className='flex justify-end mb-3'>
          <Button size={"large"} className='ml-3 font-medium bg-blue-600 text-white' onClick={showModal}>Add booking</Button>
        </div>
        <Table columns={columns} dataSource={dataFetch} />
      </div>

      <Modal title={stateIsAdd ? "Add booking" : "Edit information"} open={isModalOpen} onCancel={handleCancel} footer={[null]}>
        <form>
          <div className='form-group'>
            <label>Mã phòng</label>
            <input className="form-control" type="number" name='maPhong' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.maPhong} />
            <span className='text-danger'>{state.errors.maPhong}</span>
          </div>
          <div className='form-group'>
            <label>Ngày đến</label>
            <input className="form-control" type="datetime-local" name='ngayDen' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.ngayDen} />
            <span className='text-danger'>{state.errors.ngayDen}</span>
          </div>
          <div className='form-group'>
            <label>Ngày đi</label>
            <input className="form-control" type="datetime-local" name='ngayDi' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.ngayDi} />
            <span className='text-danger'>{state.errors.ngayDi}</span>
          </div>
          <div className='form-group'>
            <label>Số lượng khách</label>
            <input className="form-control" type="number" name='soLuongKhach' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.soLuongKhach} />
            <span className='text-danger'>{state.errors.soLuongKhach}</span>
          </div>
          <div className='form-group'>
            <label>Mã người dùng</label>
            <input className="form-control" type="number" name='maNguoiDung' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.maNguoiDung} />
            <span className='text-danger'>{state.errors.maNguoiDung}</span>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn bg-blue-600 font-medium text-white ' size={"large"} onClick={(e) => handleBooking(e)} disabled={!state.formValid}>{stateIsAdd ? "Add" : "Update"}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
