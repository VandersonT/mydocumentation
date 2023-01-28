import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import style from './Logout.module.css';

type Props = {
    cancelLO: () => void
}

const LogOut = ({ cancelLO }: Props) => {

    const [ showFlash, setShowFlash ] = useState(true);

    const logOutAction = () => {
        destroyCookie(undefined, 'token');
        Router.push('/Panel/login');
    }

    return (
        <div className={style.flashBox}>
            <img src="./assets/images/logout.png" alt="" />
            <div className={style.flashBox_info}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to log out of this account?
                confirm below to make sure.</p>
                <div className={style.buttonBox}>
                    <button className={style.cancelButton} onClick={cancelLO}>Cancel</button>
                    <button className={style.logOutButton} onClick={logOutAction}>LogOut</button>
                </div>
            </div>
        </div>
    )
}

export default LogOut;