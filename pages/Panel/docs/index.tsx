/*-------------------------------Imports----------------------------------*/
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import MenuPanel from "../../../components/MenuPanel";
import { Title } from "../../../components/Title";
import { authentication } from "../../../helpers/auth";
import { formatDate } from "../../../helpers/tools";
import { Layout } from "../../../Layouts";
import style from '../../../styles/Admin/Docs.module.css';
import { User } from "../../../types/User";
import Error from '../../../components/Error';
import Success from "../../../components/Success";
import Router from "next/router";
/*------------------------------------------------------------------------*/


/*--------------------------------Types-----------------------------------*/
type Props = {
    loggedUser: User,
    docsReceived: any
}
/*------------------------------------------------------------------------*/


const Docs = ({ loggedUser, docsReceived }: Props) => {

    /*--------------------------------States----------------------------------*/
    const [ docButtonBox, setDocButtonBox ] = useState([false]); /*Show or not the buttons of a box*/
    const [ docs, setDocs ] = useState(docsReceived);
    const [ flashError, setFlashError ] = useState('');
    const [ flashSuccess, setFlashSucces ] = useState('');
    /*------------------------------------------------------------------------*/


    /*------------------------------UseEffects--------------------------------*/
    useEffect(()=>{
        if(!loggedUser){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    const openMenu = (index: number) => {
        let aux = [];
        for(let i = 0; i < docButtonBox.length; i++)
            aux[i] = false;

        aux[index] = true;
        setDocButtonBox(aux);
    }

    const closeMenu = (index: number) => {
        setDocButtonBox([false]);
    }

    const deleteDoc = async (docId: number, index: number) => {
    
        /*Check admin permission*/
        if(parseInt(loggedUser['position']) == 1){
            setFlashError("You aren't allowed to delete any doc.")
            return;
        }
        
        /*Check if the user is sure*/
        if(!confirm('Are you sure you want to delete this doc?'))
            return;

        /*Remove item from array*/
        docs.splice(index, 1);
        
        /*Remove item from database*/
        let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/doc/${docId}}`, {
            method: 'DELETE'
        });

        setFlashSucces("You've successfully deleted this doc.")
    }

    const closeFlashs = () => {
        setFlashError('');
        setFlashSucces('');
    }
    /*------------------------------------------------------------------------*/


    return (
        <Layout selected="docs">
            <>
                <Head>
                    <title>Documentations - Panel</title>
                </Head>

                {flashError && 
                    <Error content={flashError} closeFunction={closeFlashs} />
                }
                {flashSuccess && 
                    <Success content={flashSuccess} closeFunction={closeFlashs} />
                }

                <Title content="Documentations" buttonPath="/Panel/docs/newDoc" />

                <p className={style.mainTitle}>All documentation ({docs.length})</p>
                <div>
                    <table className={style.table}>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                            </tr>
                            {docs.map((doc: any, index: number) => (
                                <tr key={index} onMouseMove={ () => openMenu(index)} onMouseLeave={() => closeMenu(index)}>
                                    <td>
                                        <Link href={`/Panel/docs/${doc['slug']}`}>
                                            <p className={style.pointer}>{doc['name']}</p>
                                        </Link>
                                        
                                        {docButtonBox[index] &&
                                            <div className={style.tdButtonBox}>
                                                <Link href={`/Panel/docs/editDoc/${doc['slug']}`}>
                                                    <button>Edit</button>
                                                </Link>
                                                <button onClick={() => deleteDoc(doc['id'], index)}>Trash</button>
                                                <a href={`/docs/${doc['slug']}/none`} target="_blank" rel="noreferrer">
                                                    <button>View Online</button>
                                                </a>
                                            </div>
                                        }
                                    </td>
                                    <td><Link href=""><p>{doc['author']}</p></Link></td>
                                    <td><p>{formatDate(doc['updated_at'])}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        </Layout>
    )
}

export default Docs;



export const getServerSideProps: GetServerSideProps = async (context) => {

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
    

    /*-------------------------Get all docs-----------------------------------*/
    let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docs`);
    let docsResponse = await res.json();
    /*------------------------------------------------------------------------*/

    return {
        props:{
            loggedUser: user['userFound'] || null,
            docsReceived: docsResponse['docs']
        }
    }
}