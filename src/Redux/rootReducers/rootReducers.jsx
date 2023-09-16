import listPhongThueReducer from 'Pages/HomeTemplates/HomePage/ListPhongThue/duckListPhongThue/reducerListPhongThue';
import viTriTimKiemReducer from 'Pages/HomeTemplates/HomePage/ListViTri/duckViTri/reducerViTri';
import layDanhSachViTriReducer from 'Pages/HomeTemplates/_components/Header/HeaderMiddleTop/duckViTri/reducerDashboardViTri';
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    layDanhSachViTriReducer: layDanhSachViTriReducer,
    listPhongThueReducer: listPhongThueReducer,
    viTriTimKiemReducer: viTriTimKiemReducer
});

export default rootReducer;