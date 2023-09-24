import React from 'react';
import "../../css/DetailCss.css";
import { useDispatch } from 'react-redux';
import { actModalDetailSuccess } from './duckModal/actModal';


export default function ModalBtn() {
    const dispatch = useDispatch();
    return (
        <div className="myModal-bao">
            <div className="modal-dialog">
                <div className="card-bao">
                    <div className="card-img-bao">
                        <img src="https://i.imgur.com/4niebFr.jpg" alt="" className='ml-24' />
                    </div>
                    <div className="card-title-bao text-center">
                        <p>Success!</p>
                    </div>
                    <div className="card-text-bao">
                        <p>Yay! It's a nice order! <br />It will arrive soon.</p>
                    </div>
                    <button className="btn-bao" onClick={() => {
                        dispatch(actModalDetailSuccess(false));
                    }}>Close</button>
                </div>
            </div>
        </div>
    )
}
