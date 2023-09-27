import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Table, Modal } from 'antd';
import {
  EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchRoom, actAddRoom, actGetRoom, actUpdateRoom, actDeleteRoom } from './duck/actions';

export default function Room() {
  const dataFetch = useSelector((state) => state.roomReducer.dataFetch);
  const dataGet = useSelector((state) => state.roomReducer.dataGet);
  const dispatch = useDispatch();
  const [stateIsAdd, setStateIsAdd] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  useEffect(() => {
    dispatch(actFetchRoom());
    if (stateIsAdd) {
      setCurrentId(-1);
      setStateForm({
        tenPhong: "",
        khach: "",
        phongNgu: "",
        giuong: "",
        phongTam: "",
        moTa: "",
        giaTien: "",
        mayGiat: true,
        banLa: true,
        tivi: true,
        dieuHoa: true,
        wifi: true,
        bep: true,
        doXe: true,
        hoBoi: true,
        banUi: true,
        maViTri: "",
        hinhAnh: "",
      });
      setState({
        errors: {
          tenPhong: "",
          khach: "",
          phongNgu: "",
          giuong: "",
          phongTam: "",
          moTa: "",
          giaTien: "",
          maViTri: "",
          hinhAnh: "",
        },
        tenPhongValid: false,
        khachValid: false,
        phongNguValid: false,
        giuongValid: false,
        phongTamValid: false,
        moTaValid: false,
        giaTienValid: false,
        maViTriValid: false,
        hinhAnhValid: false,

        formValid: false,
      });
    } else {
      if (dataGet) {
        setCurrentId(dataGet.id);
        setStateForm({
          tenPhong: dataGet.tenPhong,
          khach: dataGet.khach,
          phongNgu: dataGet.phongNgu,
          giuong: dataGet.giuong,
          phongTam: dataGet.phongTam,
          moTa: dataGet.moTa,
          giaTien: dataGet.giaTien,
          mayGiat: dataGet.mayGiat,
          banLa: dataGet.banLa,
          tivi: dataGet.tivi,
          wifi: dataGet.wifi,
          bep: dataGet.bep,
          doXe: dataGet.doXe,
          hoBoi: dataGet.hoBoi,
          banUi: dataGet.banUi,
          maViTri: dataGet.maViTri,
          hinhAnh: dataGet.hinhAnh,
        })
      }
      setState({
        errors: {
          tenPhong: "",
          khach: "",
          phongNgu: "",
          giuong: "",
          phongTam: "",
          moTa: "",
          giaTien: "",
          maViTri: "",
          hinhAnh: "",
        },
        tenPhongValid: true,
        khachValid: true,
        phongNguValid: true,
        giuongValid: true,
        phongTamValid: true,
        moTaValid: true,
        giaTienValid: true,
        maViTriValid: true,
        hinhAnhValid: true,

        formValid: true,
      })
    }
  }, [dataGet, stateIsAdd]);

  const [stateForm, setStateForm] = useState({
    tenPhong: "",
    khach: "",
    phongNgu: "",
    giuong: "",
    phongTam: "",
    moTa: "",
    giaTien: "",
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: true,
    wifi: true,
    bep: true,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: "",
    hinhAnh: "",
  });

  const [state, setState] = useState({
    errors: {
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      maViTri: "",
      hinhAnh: "",
    },
    tenPhongValid: false,
    khachValid: false,
    phongNguValid: false,
    giuongValid: false,
    phongTamValid: false,
    moTaValid: false,
    giaTienValid: false,
    maViTriValid: false,
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
  }

  const handleRoom = (e) => {
    e.preventDefault();
    if (stateIsAdd) {
      dispatch(actAddRoom(stateForm));
    } else {
      dispatch(actUpdateRoom(currentId, stateForm));
    }
  };

  const handleDelete = (id) => {
    dispatch(actDeleteRoom(id));
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() ? "" : "Vui lòng nhập trường này!";
    let { tenPhongValid, khachValid, phongNguValid, giuongValid, phongTamValid, moTaValid, giaTienValid, maViTriValid, hinhAnhValid, } = state;
    switch (name) {
      case "tenPhong":
        tenPhongValid = mess === '' ? true : false;
        break;
      case "khach":
        khachValid = mess === '' ? true : false;
        break;
      case "phongNgu":
        phongNguValid = mess === '' ? true : false;
        break;
      case "giuong":
        giuongValid = mess === '' ? true : false;
        break;
      case "phongTam":
        phongTamValid = mess === '' ? true : false;
        break;
      case "moTa":
        moTaValid = mess === '' ? true : false;
        break;
      case "giaTien":
        giaTienValid = mess === '' ? true : false;
        break;
      case "maViTri":
        maViTriValid = mess === '' ? true : false;
        break;
      case "hinhAnh":
        hinhAnhValid = mess === '' ? true : false;
        break;

      default:
        break;
    }
    setState({
      errors: { ...state.errors, [name]: mess },
      tenPhongValid, khachValid, phongNguValid, giuongValid, phongTamValid, moTaValid, giaTienValid, maViTriValid, hinhAnhValid,

      formValid: tenPhongValid && khachValid && phongNguValid && giuongValid && phongTamValid && moTaValid && giaTienValid && maViTriValid && hinhAnhValid
    })
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
    },
    {
      title: 'Số lượng khách',
      dataIndex: 'khach',
      key: 'khach',
    },
    {
      title: 'Mô tả',
      key: 'moTa',
      dataIndex: 'moTa',
    },
    {
      title: 'Mã vị trí',
      key: 'maViTri',
      dataIndex: 'maViTri',
    },
    {
      title: 'Hình ảnh',
      key: 'hinhAnh',
      dataIndex: 'hinhAnh',
      render: (_, record) => (
        <Space>
          <img className='w-70 h-50' src={record.hinhAnh} alt="" />
        </Space>
      )
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
        tenPhong: "",
        khach: "",
        phongNgu: "",
        giuong: "",
        phongTam: "",
        moTa: "",
        giaTien: "",
        mayGiat: true,
        banLa: true,
        tivi: true,
        dieuHoa: true,
        wifi: true,
        bep: true,
        doXe: true,
        hoBoi: true,
        banUi: true,
        maViTri: "",
        hinhAnh: "",
      })
    } else {
      setStateIsAdd(false);
      dispatch(actGetRoom(id))
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='room'>
      <div className='container'>
        <h1 className='text-2xl mb-3 font-medium'>Manage room information</h1>
        <div className='flex justify-end mb-3'>
          <Button size={"large"} className='ml-3 font-medium bg-blue-600 text-white' onClick={() => showModal(true, -1)}>Add room</Button>
        </div>
        <Table columns={columns} dataSource={dataFetch} />
      </div>

      <Modal title={stateIsAdd ? "Add room" : "Edit information"} open={isModalOpen} onCancel={handleCancel} footer={[null]}>
        <form>
          <div className='form-group'>
            <label>Tên phòng</label>
            <input className="form-control" type="text" name='tenPhong' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.tenPhong} />
            <span className='text-danger'>{state.errors.tenPhong}</span>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Khách</label>
              <input className="form-control" type="number" name='khach' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.khach} />
              <span className='text-danger'>{state.errors.khach}</span>
            </div>
            <div className='form-group col-sm-6'>
              <label>Phòng ngủ</label>
              <input className="form-control" type="number" name='phongNgu' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.phongNgu} />
              <span className='text-danger'>{state.errors.phongNgu}</span>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Giường</label>
              <input className="form-control" type="number" name='giuong' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.giuong} />
              <span className='text-danger'>{state.errors.giuong}</span>
            </div>
            <div className='form-group col-sm-6'>
              <label>Phòng tắm</label>
              <input className="form-control" type="number" name='phongTam' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.phongTam} />
              <span className='text-danger'>{state.errors.phongTam}</span>
            </div>
          </div>
          <div className='form-group'>
            <label>Mô tả</label>
            <input className="form-control" type="text" name='moTa' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.moTa} />
            <span className='text-danger'>{state.errors.moTa}</span>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Giá tiền</label>
              <input className="form-control" type="number" name='giaTien' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.giaTien} />
              <span className='text-danger'>{state.errors.giaTien}</span>
            </div>
            <div className='form-group col-sm-6'>
              <label>Máy giặt</label>
              <select className='form-control' name="mayGiat" onChange={(e) => handleOnchange(e)} value={stateForm.mayGiat}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Bàn là</label>
              <select className='form-control' name="banLa" onChange={(e) => handleOnchange(e)} value={stateForm.banLa}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
            <div className='form-group col-sm-6'>
              <label>Tivi</label>
              <select className='form-control' name="tivi" onChange={(e) => handleOnchange(e)} value={stateForm.tivi}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Điều hòa</label>
              <select className='form-control' name="dieuHoa" onChange={(e) => handleOnchange(e)} value={stateForm.dieuHoa}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
            <div className='form-group col-sm-6'>
              <label>Wifi</label>
              <select className='form-control' name="wifi" onChange={(e) => handleOnchange(e)} value={stateForm.wifi}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Bếp</label>
              <select className='form-control' name="bep" onChange={(e) => handleOnchange(e)} value={stateForm.bep}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
            <div className='form-group col-sm-6'>
              <label>Đổ xe</label>
              <select className='form-control' name="doXe" onChange={(e) => handleOnchange(e)} value={stateForm.doXe}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-sm-6'>
              <label>Hồ bơi</label>
              <select className='form-control' name="hoBoi" onChange={(e) => handleOnchange(e)} value={stateForm.hoBoi}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
            <div className='form-group col-sm-6'>
              <label>Bàn ủi</label>
              <select className='form-control' name="banUi" onChange={(e) => handleOnchange(e)} value={stateForm.banUi}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label>Mã vị trí</label>
            <input className="form-control" type="number" name='maViTri' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.maViTri} />
            <span><span className='text-danger'>{state.errors.maViTri}</span></span>
          </div>
          <div className='form-group'>
            <label>Hình ảnh</label>
            <input className="form-control" type="text" name='hinhAnh' onChange={(e) => handleOnchange(e)} onBlur={(e) => handleValidation(e)} value={stateForm.hinhAnh} />
            <span className='text-danger'>{state.errors.hinhAnh}</span>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn bg-blue-600 font-medium text-white ' size={"large"} onClick={(e) => handleRoom(e)} disabled={!state.formValid}>{stateIsAdd ? "Add" : "Update"}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
