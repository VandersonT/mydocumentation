/*----------------IMPORTS-----------------------*/
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Context';
import style from './Header.module.css';
import themeMode from '../../styles/ThemeMode.module.css';
import Link from 'next/link';
/*----------------------------------------------*/

type Props = {
    link: string
}

const Header = ({ link }: Props) => {

    const { state, dispatch } = useContext(Context);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if(theme != null){
            dispatch({
                type: 'CHANGE_THEME',
                payload: {
                    status: theme
                }
            })
        }
            
    }, []);

    const changeTheme = () => {
        localStorage.setItem('theme', ((state.theme.status == 'light') ? 'dark' : 'light'));
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

            <div className={`${style.headerDesktop} ${(state.theme.status == 'dark') ? themeMode.headerDesktopDark : ''}`}>
                <Link href={link}>
                    <img className={style.logo} src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/${(state.theme.status == 'dark') ? 'logo.png' : 'logo2.png'}`} alt="my documentation logo" />
                </Link>
                <div className={`${style.form} ${(state.theme.status == 'dark') ? themeMode.formDark : ''}`}>
                    <input type="text" placeholder="Search for some documentation" onChange={handleSearch} value={search}/>
                    <button>
                        <Link href={"/docs?search="+search} className={style.formButtond}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    </button>
                </div>
                <button onClick={changeTheme} className={`${style.button} ${(state.theme.status == 'dark') ? themeMode.buttonDark : ''}`}>
                    {(state.theme.status == 'light') ? <i className="fa-solid fa-cloud-moon"></i> : <i className="fa-solid fa-cloud-sun"></i>}
                    {(state.theme.status == 'light') ? 'Dark' : 'Light'}
                </button>
            </div>

            <div className={style.headerMobile}>
                <div className={`${style.header} ${(state.theme.status == 'dark') ? themeMode.headerDark : ''}`}>
                    <div></div>
                    <Link href="/">
                        <img src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/icon1.png`} alt="my documentation logo" />
                    </Link>
                    <div onClick={changeTheme}>
                        {(state.theme.status == 'light') ? <i className="fa-solid fa-cloud-moon"></i> : <i className="fa-solid fa-cloud-sun"></i>}
                    </div>
                </div>
                <div className={`${style.searchBox} ${(state.theme.status == 'dark') ? themeMode.searchBoxDark : ''}`}>
                    <input type="text" placeholder="Search for some documentation" onChange={handleSearch} value={search} />
                    <button>
                        <Link href={"/docs?search="+search}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    </button>
                </div>
            </div>

        </header>
    );
}

export default Header;