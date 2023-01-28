/*----------------IMPORTS-----------------------*/
import Link from 'next/link';
import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import LogOut from '../logOut';
import style from './MenuPanel.module.css';
/*----------------------------------------------*/

type Props = {
    selected?: string
}

const MenuPanel = ({ selected }: Props) => {

    const [ showMenu, setShowMenu ] = useState(true);
    const [ logOut, setLogOut ] = useState(false);
    
    const cancelLogOut = () => {
        setLogOut(false);
    }

    const handlerMenuMobile = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className={style.main}>

            {logOut &&
                <>
                    <LogOut cancelLO={cancelLogOut} />
                </>
            }

            {showMenu &&
                <div className={style.menuBox}>

                    <div className={style.panelLogo}>    
                        <img src="http://localhost:3000/assets/images/panelLogo.png" alt="panel logo" />
                    </div>

                    <ul className={style.menu}>
                        <Link href="/Panel">
                            <li className={(selected == 'dashboard') ? style.selected : ''}><i className="fa-solid fa-chart-pie"></i> Dashboard</li>
                        </Link>
                        <Link href="/Panel/docs">
                            <li className={(selected == 'docs') ? style.selected : ''}><i className="fa-brands fa-dochub"></i> Documentations</li>
                        </Link>
                        <Link href="/Panel/members">
                            <li className={(selected == 'members') ? style.selected : ''}><i className="fa-solid fa-user"></i> Members</li>
                        </Link>
                        <Link href="/Panel/media">
                            <li className={(selected == 'media') ? style.selected : ''}><i className="fa-solid fa-photo-film"></i> Media</li>
                        </Link>
                        <a target="_blank" href="/">
                            <li ><i className="fa-solid fa-desktop"></i> System</li>
                        </a>
                        <button className={style.logOut} onClick={() => setLogOut(true)}><i className="fa-solid fa-door-open"></i>Log out</button>
                    </ul>
                </div>
            }
            <button
                className={`${style.btnMenuMobile} ${(showMenu) ? style.menuOpened : style.menuClosed }`} 
                onClick={handlerMenuMobile}>
                    <i className="fa-solid fa-square-caret-right"></i>
            </button>
        </div>
    )
}

export default MenuPanel;