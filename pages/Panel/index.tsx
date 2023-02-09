/*------------------------------Imports------------------------------------*/
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import  Router from 'next/router';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { User }  from '../../types/User';
import { authentication } from '../../helpers/auth';

//Components
import { Layout } from '../../Layouts';
import { Title } from '../../components/Title';
import Error from '../../components/Error';
import Success from '../../components/Success';
import Warning from '../../components/Warning';
import { formatDate } from '../../helpers/tools';

//Css's
import style from '../../styles/Admin/Panel.module.css';

/*------------------------------------------------------------------------*/



/*-------------------------------Types------------------------------------*/
type Props = {
    loggedUser: User,
    mostViewedDocs: any,
    generalData: any,
    currentDocs: any
}
/*------------------------------------------------------------------------*/



const Panel = ({ loggedUser, mostViewedDocs, generalData, currentDocs }: Props) => {
    
    /*---------------------------------States---------------------------------*/
    const [ systemStatus, setSystemStatus ] = useState(generalData['systemStatus']);
    const [ currentPagination, setCurrentPagination ] = useState(1);
    const [ tableDoc, setTableDoc ] = useState(currentDocs['docs']);
    const [ nexPageExists, setNexPageExists ] = useState(currentDocs['anotherPage']);
    const [ docSearched, setDocSearched ] = useState('');
    const [ showAllDocs, setShowAllDocs ] = useState(true);/*Used to know if are showing all docs or searched docs*/
    const [ errorFlash, setErrorFlash ] = useState('');/*Error messages*/
    const [ successFlash, setSuccessFlash ] = useState('');/*Error messages*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------UseEffects-------------------------------*/
    
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    const clearFlashs = () => {
        setErrorFlash('');
        setSuccessFlash('');
    }
    
    const nextPage = async () => {

        if(!nexPageExists) { alert('tem mais n'); return;}
        
        /*Get docs*/
        if(showAllDocs){
            let res = await fetch('http://localhost:4000/docs?page='+(currentPagination+1))
            currentDocs = await res.json();
            setCurrentPagination(currentPagination+1);

            setTableDoc(currentDocs['docs']);
            setNexPageExists(currentDocs['anotherPage']);
        }else{
            let res = await fetch('http://localhost:4000/docByName/'+docSearched+'?page='+(currentPagination+1));
            currentDocs = await res.json();
            setCurrentPagination(currentPagination+1);

            setTableDoc(currentDocs['docFound']);
            setNexPageExists(currentDocs['anotherPage']);
        }
    }

    const prevPage = async () => {

        if(currentPagination == 1) { alert('tem mais n'); return;}
        
        /*Get docs*/
        if(showAllDocs){
            let res = await fetch('http://localhost:4000/docs?page='+(currentPagination-1))
            currentDocs = await res.json();

            setCurrentPagination(currentPagination-1);
            setTableDoc(currentDocs['docs']);
            setNexPageExists(currentDocs['anotherPage']);
        }else{
            let res = await fetch('http://localhost:4000/docByName/'+docSearched+'?page='+(currentPagination-1));
            currentDocs = await res.json();
            setCurrentPagination(currentPagination-1);

            setTableDoc(currentDocs['docFound']);
            setNexPageExists(currentDocs['anotherPage']);
        }
    }

    const searchDoc = async () => {
        if(docSearched){

            /*Now we aren't showing all docs, but just searched docs*/
            setShowAllDocs(false);

            setCurrentPagination(1);

            let res = await fetch('http://localhost:4000/docByName/'+docSearched+'?page='+1);
            let aux = await res.json();

            setTableDoc(aux['docFound']);
            setNexPageExists(aux['anotherPage']);

        }else{
            /*Now we aren't showing searched docs, but all docs*/
            setShowAllDocs(true);

            let res = await fetch('http://localhost:4000/docs?page=1')
            currentDocs = await res.json();

            setCurrentPagination(1);
            setTableDoc(currentDocs['docs']);
            setNexPageExists(currentDocs['anotherPage']);
        }
    }

    const changeSystemStatus = async () => {

        if(parseInt(loggedUser['position']) == 1){
            setErrorFlash('You have no permission to do this.');
            setSuccessFlash('');
            return;
        }

        let res = await fetch('http://localhost:4000/system',{
            method: 'PUT',
            body: new URLSearchParams({
                status: ((systemStatus) ? 'false' : 'true'), /*if enabled, disable, And vice versa.*/
                id: '1'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        setSystemStatus(!systemStatus);
        
        setErrorFlash('');
        if(systemStatus){
            setSuccessFlash('The system has been disabled.')
        }else{
            setSuccessFlash('The system has been enabled.')
        }
    }
    /*------------------------------------------------------------------------*/

    return (
        <>
        <Layout selected="dashboard">
            <>
                <Head>
                    <title>Dashboard - Panel</title>
                </Head>

                {errorFlash && <Error content={errorFlash} closeFunction={clearFlashs} />}

                {successFlash && <Success content={successFlash} closeFunction={clearFlashs} />}

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
                                    {mostViewedDocs.map((docSingle: any, index: any) => (
                                        <li key={index}><span>{index+1}. {docSingle['name']}</span><span>{(docSingle['amount'] > 10000) ? 9999+'+' : docSingle['amount']}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className={style.info}>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>{generalData['totalDocs']}</div>
                                    <p>Total Docs</p>
                                </div>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>{generalData['totalStaffs']}</div>
                                    <p>Total Staff</p>
                                </div>
                                <div className={style.infoSingle}>
                                    <div className={style.infoSingle_amount}>{(generalData['totalViews'] > 10000) ? 9999+'+' : generalData['totalViews']}</div>
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
                                <input type="text" placeholder="Search for a documentation" value={docSearched} onChange={(e) => setDocSearched(e.target.value) } />
                                <button onClick={searchDoc}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                            </div>

                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Views</th>
                                    </tr>
                                    {tableDoc.map((docSingle: any, index: any) => (
                                        <tr key={index}>
                                            <td>{docSingle['name']}</td>
                                            <td>{formatDate(docSingle['created_at'])}</td>
                                            <td>{docSingle['views']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={style.tableControl}>
                                <button
                                    className={(currentPagination == 1) ? style.buttonDisabled : ''}
                                    onClick={prevPage}
                                >Preview</button>
                                <button
                                    className={(!nexPageExists) ? style.buttonDisabled : ''}
                                    onClick={nextPage}
                                >Next</button>
                            </div>

                        </div>
                    </section>

                    <section className={style.control}>
                        <img src="/assets/images/panelImg2.png" alt="" />
                        <div className={style.controlBox}>
                            <button onClick={changeSystemStatus}>
                                {(systemStatus) ? 'System: On' : 'System: Off'}
                            </button>
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
    
    /*----------------------Try to authenticate-------------------------------*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);//Try to authenticate
    
    if(!user){
        nookies.set(context, 'token', '', {
            maxAge: -1,
            path: '/',
        });
        return {redirect: {destination: '/Panel/login',permanent: false,}}
    }
    /*------------------------------------------------------------------------*/

    /*--------------------get most viewed docs--------------------------------*/
    let res = await fetch('http://localhost:4000/mostViewedDocs/5');
    let mostViewedDocs = await res.json();
    /*------------------------------------------------------------------------*/

    /*---------------------Get general data-----------------------------------*/
    let res2 = await fetch('http://localhost:4000/globalDatas');
    let generalData = await res2.json();
    /*------------------------------------------------------------------------*/

    /*------------------------Get docs----------------------------------------*/
    let res3 = await fetch('http://localhost:4000/docs?page=1')
    let currentDocs = await res3.json();
    /*------------------------------------------------------------------------*/

    
    return {
        props: {
            loggedUser: user['userFound'] || null,
            mostViewedDocs: mostViewedDocs['result'],
            generalData: generalData['globalData'],
            currentDocs
        }
    }
}