import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Table, Modal } from 'antd';
import {
  EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actAddLocation, actDeleteLocation, actFetchLocation, actGetLocation, actUpdateLocation } from './duck/actions';

export default function Location() {
  const dataFetch = useSelector((state) => state.locationReducer.dataFetch);
  const dataGet = useSelector((state) => state.locationReducer.dataGet);
  const dispatch = useDispatch();
  const [stateIsAdd, setStateIsAdd] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  useEffect(() => {
    dispatch(actFetchLocation());
    if (stateIsAdd) {
      setCurrentId(-1);
      setStateForm({
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: "",
      });
      setState({
        errors: {
          tenViTri: "",
          tinhThanh: "",
          quocGia: "",
          hinhAnh: "",
        },
        tenViTriValid: false,
        tinhThanhValid: false,
        quocGiaValid: false,
        hinhAnhValid: false,

        formValid: false,
      });
    } else {
      if (dataGet) {
        setCurrentId(dataGet.id);
        setStateForm({
          tenViTri: dataGet.tenViTri,
          tinhThanh: dataGet.tinhThanh,
          quocGia: dataGet.quocGia,
          hinhAnh: dataGet.hinhAnh,
        });
      }
      setState({
        errors: {
          tenViTri: "",
          tinhThanh: "",
          quocGia: "",
          hinhAnh: "",
        },
        tenViTriValid: true,
        tinhThanhValid: true,
        quocGiaValid: true,
        hinhAnhValid: true,

        formValid: true,
      })
    }
  }, [dataGet, stateIsAdd]);

  const [stateForm, setStateForm] = useState({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });

  const [state, setState] = useState({
    errors: {
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    tenViTriValid: false,
    tinhThanhValid: false,
    quocGiaValid: false,
    hinhAnhValid: false,

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

  const handleLocation = (e) => {
    e.preventDefault();
    if (stateIsAdd) {
      dispatch(actAddLocation(stateForm));
    } else {
      dispatch(actUpdateLocation(currentId, stateForm));
    }
  };

  const handleDelete = (id) => {
    dispatch(actDeleteLocation(id))
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() ? "" : "Vui lòng nhập trường này!";
    let { tenViTriValid, tinhThanhValid, quocGiaValid, hinhAnhValid, } = state;
    switch (name) {
      case "tenViTri":
        tenViTriValid = mess === '' ? true : false;
        break;
      case "tinhThanh":
        tinhThanhValid = mess === '' ? true : false;
        break;
      case "quocGia":
        quocGiaValid = mess === '' ? true : false;
        break;
      case "hinhAnh":
        hinhAnhValid = mess === '' ? true : false;
        break;
      default:
        break;
    }
    setState({
      errors: { ...state.errors, [name]: mess },
      tenViTriValid,
      tinhThanhValid,
      quocGiaValid,
      hinhAnhValid,

      formValid: tenViTriValid && tinhThanhValid && quocGiaValid && hinhAnhValid
    });
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên vị trí',
      dataIndex: 'tenViTri',
      key: 'name',
    },
    {
      title: 'Tỉnh thành',
      dataIndex: 'tinhThanh',
      key: 'tinhThanh',
    },
    {
      title: 'Quốc gia',
      key: 'quocGia',
      dataIndex: 'quocGia',
    },
    {
      title: 'Hình ảnh',
      key: 'hinhAnh',
      dataIndex: 'hinhAnh',
      render: (_, record) => (
        <Space >
          <img className='w-20 h-20' src={record.hinhAnh} alt="" />
        </Space>
      ),
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
      dispatch(actGetLocation(id))
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='location'>
      <div className='container'>
        <h1 className='text-2xl mb-3 font-medium'>Manage location information</h1>
        <div className='flex justify-end mb-3'>
          <Button size={"large"} className='ml-3 font-medium bg-blue-600 text-white' onClick={() => showModal(true, -1)}>Add location</Button>
        </div>
        <Table columns={columns} dataSource={dataFetch} />
      </div>

      <Modal title={stateIsAdd ? "Add location" : "Edit information"} open={isModalOpen} onCancel={handleCancel} footer={[null]}>
        <form className='mt-4 text-gray-900'>
          <div className='form-group'>
            <label>Tên vị trí</label>
            <input className="form-control" type="text" name='tenViTri' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.tenViTri} />
            <span className='text-danger'>{state.errors.tenViTri}</span>
          </div>
          <div className='form-group'>
            <label>Tỉnh thành</label>
            <input className="form-control" type="text" name='tinhThanh' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.tinhThanh} />
            <span className='text-danger'>{state.errors.tinhThanh}</span>
          </div>
          <div className='form-group'>
            <label>Quốc gia</label>
            <input className="form-control" type="text" name='quocGia' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.quocGia} />
            <span className='text-danger'>{state.errors.quocGia}</span>
          </div>
          <div className='form-group'>
            <label>Hình ảnh</label>
            <input className="form-control" type="text" name='hinhAnh' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.hinhAnh} />
            <span className='text-danger'>{state.errors.hinhAnh}</span>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn bg-blue-600 font-medium text-white ' size={"large"} onClick={(e) => handleLocation(e)} disabled={!state.formValid}>{stateIsAdd ? "Add" : "Update"}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
