/*----------------IMPORTS-----------------------*/
    import { GetServerSideProps } from 'next';
    import Head from 'next/head';
    import  Router from 'next/router';
    import { destroyCookie, parseCookies } from 'nookies';
    import { useEffect } from 'react';
    import { User }  from '../../types/User';
    import { authentication } from '../../helpers/teste';

    //Components
    import { Layout } from '../../Layouts';
    import { Title } from '../../components/Title';

    //Css's
    import style from '../../styles/Admin/Panel.module.css';
/*----------------------------------------------*/


type Props = {
    loggedUser: User
}

const Panel = ({ loggedUser }: Props) => {
    
    useEffect(()=>{
        if(!loggedUser){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])

    return (
        <>
        <Layout selected="dashboard">
            <>
                <Head>
                    <title>Dashboard - Panel</title>
                </Head>

                <main className={style.main}>
                    <Title content="Dashboard" />

                    <section className={style.welcome}>
                        <img src="http://localhost:3000/assets/images/logoP.png" alt="" />
                        <div className={style.welcomeMsg}>
                            <h3>Welcome to Control Panel</h3>
                            <p>Here you can control the entire system, from changing the theme color to creating, removing or editing some documentation. The platform seeks to be as simple and intuitive as possible so that you don’t encounter problems when using it. If you need any help just click the button below.</p>
                            <a target="_blank" className={style.buttonHelp} href="https://web.whatsapp.com/send?phone=5533988860799">
                                <i className="fa-solid fa-arrow-right"></i>
                                Help me
                            </a>
                        </div>
                        <img src="http://localhost:3000/assets/images/imgPanel.png" />
                    </section>

                    <section className={style.status}>
                        <div className={style.leftStatus}>
                            <div className={style.mostViewed}>
                                <h3>
                                    <i className="fa-solid fa-circle-check"></i>
                                    Most viewed docs
                                </h3>
                                <ul>
                                    <li><span>1. PHP Documentation</span><span>400</span></li>
                                    <li><span>2. Node Documentation</span><span>90</span></li>
                                    <li><span>3. Adonis Documentation</span><span>99</span></li>
                                    <li><span>4. Laravel Documentation</span><span>32</span></li>
                                    <li><span>5. Express</span><span>45</span></li>
                                </ul>
                            </div>
                            <div className={style.info}>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>2</div>
                                    <p>Total Docs</p>
                                </div>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>43</div>
                                    <p>Total Staff</p>
                                </div>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>100+</div>
                                    <p>Total Views</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.rightStatus}>
                            <h3>
                                <i className="fa-solid fa-calendar-days"></i>
                                View of each documentation
                            </h3>

                            <div className={style.form}>
                                <input type="text" placeholder="Search for a documentation" />
                                <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                            </div>

                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Views</th>
                                    </tr>
                                    <tr>
                                        <td>teste</td>
                                        <td>teste</td>
                                        <td>teste</td>
                                    </tr>
                                    <tr>
                                        <td>teste</td>
                                        <td>teste</td>
                                        <td>teste</td>
                                    </tr>
                                    <tr>
                                        <td>teste</td>
                                        <td>teste</td>
                                        <td>teste</td>
                                    </tr>
                                    <tr>
                                        <td>teste</td>
                                        <td>teste</td>
                                        <td>teste</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={style.tableControl}>
                                <button className={style.buttonDisabled}>Preview</button>
                                <button>Next</button>
                            </div>

                        </div>
                    </section>

                    <section className={style.control}>
                        <img src="/assets/images/panelImg2.png" alt="" />
                        <div className={style.controlBox}>
                            <button>System: On</button>
                            <p>The system is currently online, click to deactivate it</p>
                        </div>
                        <img src="/assets/images/panelImg3.png" alt="" />
                    </section>

                </main>
            </>
        </Layout>
        </>
    )
}

export default Panel;


export const getServerSideProps: GetServerSideProps = async(context) => {
    
    /*Get cookies*/
    const cookies = parseCookies(context);

    /*Try to authenticate*/
    let user = await authentication(cookies.token);

    /*Final Result*/
    return {
        props: {
            loggedUser: user['userFound'] || null
        }
    }
}