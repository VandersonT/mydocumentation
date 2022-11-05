/*----------------IMPORTS-----------------------*/
import style from './Header.module.css';
/*----------------------------------------------*/

const Header = () => {
    return (
        <header>

            <div className={style.headerDesktop}>
                <img className={style.logo} src="http://localhost:3000/assets/images/logo2.png" alt="my documentation logo" />
                <div className={style.form}>
                    <input type="text" placeholder="Search for some documentation" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button className={style.button}>
                    <i className="fa-solid fa-cloud-moon"></i>
                    DarkMode
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