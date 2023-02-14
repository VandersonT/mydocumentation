/*----------------------------------Imports-------------------------------*/
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import nookies, { parseCookies } from "nookies";
import { ChangeEvent, useState } from "react";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { authentication } from "../../helpers/auth";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Media.module.css';
import { User } from "../../types/User";
/*------------------------------------------------------------------------*/



/*-------------------------------------Types------------------------------*/
type Props = {
    loggedAdmin: User,
    medias: any
}
/*------------------------------------------------------------------------*/



/*------------------------------------------------------------------------*/

const Media = ({ loggedAdmin, medias }: Props) => {

    /*--------------------------------States----------------------------------*/
    const [ media, setMedia ] = useState<File>();
    const [ confirmMedia, setConfirmMedia ] = useState(false);
    /*------------------------------------------------------------------------*/



    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    const chooseMedia = (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files){
            setMedia(e.target.files[0]);

            setConfirmMedia(true);
        }
    }

    const teste = async () => {

        if (!media) return;

        alert('This page is still under construction.');

        setConfirmMedia(false);
    }
    /*------------------------------------------------------------------------*/

    return (
        <Layout selected="media">
            <>
                <Head>
                    <title>Media - Panel</title>
                </Head>
                <Title content="Media" />

                <div className={style.menuBar}>
                    <select>
                        <option>All media</option>
                    </select>
                    <button>Delete All</button>
                </div>
                
                {confirmMedia &&
                    <>
                        <button onClick={teste} className={style.confirmSubmit}>Salvar Media</button>
                        <div className={style.bgDark}></div>
                    </>
                }

                <form className={style.mediaBox}>
                    <label className={style.newMedia} htmlFor='selecao-arquivo'>
                        <i className="fa-solid fa-plus"></i>
                    </label>
                    <input className={style.inputFile} id='selecao-arquivo' type='file' onChange={chooseMedia}></input>

                    {medias.map((media: any, index: number)=>(
                        <Link href="/Panel/mediaOpened" key={index}>
                            <img src={`http://localhost:4000/media/${media['name']}`} className={style.mediaSingle} />
                        </Link>
                    ))}
                </form>

            </>
        </Layout>
    )
}

export default Media;



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

    /*-------------------------Get Medias-------------------------------------*/
    let res = await fetch('http://localhost:4000/media');
    let response = await res.json();
    /*------------------------------------------------------------------------*/

    return {
        props: {
            loggedAdmin: user['userFound'] || null,
            medias: response['medias']
        }
    }
}