/*----------------IMPORTS-----------------------*/
import Link from 'next/link';
import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import style from './MenuPanel.module.css';
/*----------------------------------------------*/

const MenuPanel = () => {

    const [ showMenu, setShowMenu ] = useState(true);

    const logOut = () => {

        if(!confirm('Are you sure you want to leave?')){
            return false;
        }

        destroyCookie(undefined, 'token');
        Router.push('/Panel/login');
    }

    const handlerMenuMobile = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className={style.main}>
            {showMenu &&
                <div className={style.menuBox}>

                    <div className={style.panelLogo}>    
                        <img src="http://localhost:3000/assets/images/panelLogo.png" alt="panel logo" />
                    </div>

                    <ul className={style.menu}>
                        <Link href="/"><li className={style.selected}><i className="fa-solid fa-chart-pie"></i> Dashboard</li></Link>
                        <Link href="/"><li><i className="fa-solid fa-file"></i> Pages</li></Link>
                        <Link href="/"><li><i className="fa-brands fa-dochub"></i> Documentations</li></Link>
                        <Link href="/"><li><i className="fa-solid fa-user"></i> Membros</li></Link>
                        <Link href="/"><li><i className="fa-solid fa-photo-film"></i> Media</li></Link>
                        <Link href="/"><li><i className="fa-solid fa-desktop"></i> System</li></Link>
                        <button className={style.logOut} onClick={logOut}><i className="fa-solid fa-door-open"></i>Log out</button>
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