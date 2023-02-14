/*------------------------------Imports-----------------------------------*/
import Head from 'next/head';
import { useState } from 'react';
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'

//Css's
import style from '../../styles/Admin/Login.module.css';
import { GetServerSideProps } from 'next';
/*------------------------------------------------------------------------*/




const Login = () => {
    
    /*-------------------------------States-----------------------------------*/
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ keepConnected, setKeepConnected ] = useState(false);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    /*------------------------------------------------------------------------*/



    /*-----------------------------Functions----------------------------------*/
    const loginHandler = async (e:React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(email && password){

            try{
                setLoading(true);
                
                let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/login`,{
                    method: 'POST',
                    body: new URLSearchParams({email, password}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                
                let json = await res.json();

                setLoading(false);

                if(json['error'] == ""){
                    //Now you're logged in and received the token -> json['token']
                    setError('');
                    
                    if(keepConnected){
                        setCookie(null, 'token', json['token'], {
                            maxAge: 86400 * 30,
                            path: '/',
                        })
                    }else{
                        setCookie(null, 'token', json['token'], {
                            maxAge: 3600,
                            path: '/',
                        })
                    }

                    Router.push('/Panel');
                }else{
                    //Login failed, and you received a error message -> json['error']
                    setError(json['error']);
                }

            }catch(error){
                Router.push('/error');
            }
        }
    }

    const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlerPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handlerKeepConnected = () => {
        setKeepConnected(!keepConnected);
    }
    /*------------------------------------------------------------------------*/

    return (
        <>
            <Head>
                <title>Login - MyDocumentation</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
            </Head>
            <section className={style.main}>

                <img className={style.loginSvg} src="/assets/svgs/loginSvg.png" />
                <form className={style.loginBox}>
                    <h2>Panel</h2>
                    {error &&
                        <p className={`${style.flash} animate__animated animate__bounceIn`}>{error}</p>
                    }
                    <label>Email</label>
                    <input type="email" name="emailI" placeholder="example@gmail.com" onChange={handlerEmail} value={email}/>
                    <label>Password</label>
                    <input type="password" placeholder="**********" onChange={handlerPass} value={password}/>
                    <div className={style.formOptions}>
                        <div className={style.keepConnected}>
                            <input type="checkbox" onClick={handlerKeepConnected} />
                            <span>Keep Connected</span>
                        </div>
                        <button onClick={loginHandler}>
                            {(loading) ? 'Loading...' : 'Login'}
                        </button>
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


export const getServerSideProps: GetServerSideProps = async(context) => {


    /*-------------------------Check if is logged------------------------------*/
    const cookies = parseCookies(context);
    if(cookies.token){
        return {
            redirect: {
                destination: '/Panel',
                permanent: false,
            },
        }
    }
    /*------------------------------------------------------------------------*/
    
    return {
        props: {}
    }
}