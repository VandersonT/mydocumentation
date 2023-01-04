/*----------------IMPORTS-----------------------*/
import { useContext } from 'react';
import { Context } from '../../contexts/Context';
import style from './Header.module.css';
/*----------------------------------------------*/

const Header = () => {

    const { state, dispatch } = useContext(Context);

    const changeTheme = () => {

        dispatch({
            type: 'CHANGE_THEME',
            payload: {
                status: ((state.theme.status == 'light') ? 'dark' : 'light') 
            }
        })
        
    }

    return (
        <header>

            <div className={style.headerDesktop}>
                <img className={style.logo} src="http://localhost:3000/assets/images/logo2.png" alt="my documentation logo" />
                <div className={style.form}>
                    <input type="text" placeholder="Search for some documentation" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button onClick={changeTheme} className={style.button}>
                    <i className="fa-solid fa-cloud-moon"></i>
                    {state.theme.status}
                </button>
            </div>

            <div className={style.headerMobile}>
                <div className={style.header}>
                    <div></div>
                    <img src="http://localhost:3000/assets/images/icon1.png" alt="my documentation logo"  />
                    <i className="fa-solid fa-cloud-moon"></i>
                </div>
                <div className={style.searchBox}>
                    <input type="text" placeholder="Search for some documentation" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            
        </header>
    );
}

export default Header;