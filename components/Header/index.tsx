/*----------------IMPORTS-----------------------*/
import { useContext, useState } from 'react';
import { Context } from '../../contexts/Context';
import style from './Header.module.css';
import Link from 'next/link';
/*----------------------------------------------*/

const Header = () => {

    const { state, dispatch } = useContext(Context);
    const [search, setSearch] = useState('');

    const changeTheme = () => {
        dispatch({
            type: 'CHANGE_THEME',
            payload: {
                status: ((state.theme.status == 'light') ? 'dark' : 'light')
            }
        })
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <header>

            <div className={style.headerDesktop}>
                <Link href="/">
                    <img className={style.logo} src="http://localhost:3000/assets/images/logo2.png" alt="my documentation logo" />
                </Link>
                <div className={style.form}>
                    <input type="text" placeholder="Search for some documentation" onChange={handleSearch}/>
                    <button>
                        <Link href={"/docs?search="+search} className={style.formButtond}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    </button>
                </div>
                <button onClick={changeTheme} className={style.button}>
                    {(state.theme.status == 'light') ? <i className="fa-solid fa-cloud-moon"></i> : <i className="fa-solid fa-cloud-sun"></i>}
                    {(state.theme.status == 'light') ? 'Dark' : 'Light'}
                </button>
            </div>

            <div className={style.headerMobile}>
                <div className={style.header}>
                    <div></div>
                    <Link href="/">
                        <img src="http://localhost:3000/assets/images/icon1.png" alt="my documentation logo" />
                    </Link>
                    <div onClick={changeTheme}>
                        {(state.theme.status == 'light') ? <i className="fa-solid fa-cloud-moon"></i> : <i className="fa-solid fa-cloud-sun"></i>}
                    </div>
                </div>
                <div className={style.searchBox}>
                    <input type="text" placeholder="Search for some documentation" />
                    <button> <i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>

        </header>
    );
}

export default Header;