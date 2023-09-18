import listPhongThueReducer from 'Pages/HomeTemplates/HomePage/ListPhongThue/duckListPhongThue/reducerListPhongThue';
import viTriTimKiemReducer from 'Pages/HomeTemplates/HomePage/ListViTri/duckViTri/reducerViTri';
import isOpenModalEditUserReducer from 'Pages/HomeTemplates/User/_components/duckEditUser/reducerEditUser';
import listPhongDaDatUserReducer from 'Pages/HomeTemplates/User/duckListDatPhong/reducerUserDatPhong';
import layDanhSachViTriReducer from 'Pages/HomeTemplates/_components/Header/HeaderMiddleTop/duckViTri/reducerDashboardViTri';
import {combineReducers} from 'redux';
import authReducer from 'Pages/AdminTemplates/Auth/duck/reducer';
import userReducer from 'Pages/AdminTemplates/User/duck/reducer';
const rootReducer = combineReducers({
    layDanhSachViTriReducer: layDanhSachViTriReducer,
    listPhongThueReducer: listPhongThueReducer,
    viTriTimKiemReducer: viTriTimKiemReducer,
    listPhongDaDatUserReducer: listPhongDaDatUserReducer,
    isOpenModalEditUserReducer: isOpenModalEditUserReducer,
    authReducer,
    userReducer,
});

export default rootReducer;