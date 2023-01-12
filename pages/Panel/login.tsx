/*----------------IMPORTS-----------------------*/
  import Head from 'next/head';
  //Css's
  import style from '../../styles/Admin/Login.module.css';
/*----------------------------------------------*/




const Login = () => {
    return (
        <>
            <Head>
                <title>Login - MyDocumentation</title>
            </Head>
            <section className={style.main}>

                <img className={style.loginSvg} src="/assets/svgs/loginSvg.png" />
                <form className={style.loginBox}>
                    <h2>Panel</h2>
                    <label>Email</label>
                    <input type="email" name="emailI" placeholder="example@gmail.com" />
                    <label>Password</label>
                    <input type="password" placeholder="**********" />
                    <div className={style.formOptions}>
                        <div className={style.keepConnected}>
                            <input type="checkbox" />
                            <span>Keep Connected</span>
                        </div>
                        <button>Login</button>
                    </div>
                </form>

                <span className={style.star1}><i className="fa-solid fa-star"></i></span>
                <span className={style.star2}><i className="fa-solid fa-star"></i></span>
                <span className={style.star3}><i className="fa-solid fa-star"></i></span>
                <span className={style.star4}><i className="fa-solid fa-star"></i></span>
            </section>
        </>
    )
}

export default Login;