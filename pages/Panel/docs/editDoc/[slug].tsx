/*-----------------------------Imports------------------------------------*/
import { Layout } from "../../../../Layouts";
import style from '../../../../styles/Admin/NewDoc.module.css';
import dynamic from 'next/dynamic'
import { Title } from "../../../../components/Title";
import { useEffect, useState } from "react";
import Error from "../../../../components/Error";
import Router from "next/router";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import {authentication} from '../../../../helpers/auth';
import { User } from "../../../../types/User";
import Head from "next/head";
/*------------------------------------------------------------------------*/


/*------------------------------Types-------------------------------------*/
type Props = {
    loggedUser: User,
    docOpened: any
}
/*------------------------------------------------------------------------*/


const Docs = ({ loggedUser, docOpened }: Props) => {

    /*------------------------------States------------------------------------*/
    const [ docName, setDocName ] = useState(docOpened['name']);
    const [ description, setDescription ] = useState(docOpened['description']);
    const [ imageUrl, setImageUrl ] = useState(docOpened['image']);
    const [ slug, setSlug ] = useState(docOpened['slug']);
    const [ flashError, setFlashError ] = useState('');
    const [ changeSlug, setChangeSlug ] = useState(false);
    /*------------------------------------------------------------------------*/


    /*-----------------------------UseEffects---------------------------------*/
    
    /*------------------------------------------------------------------------*/


    /*-----------------------------Functions----------------------------------*/
    const clearFlashs = () => {
        setFlashError('');
    }

    const editButton = async () => {

        if(loggedUser['position'] == "1" && docOpened['author'] != loggedUser['id']){
            setFlashError('You can only edit a document created by yourself.')
            return false;
        }

        if(docName && description && imageUrl && slug){
            
            let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/doc/${docOpened['id']}`,{
                method: 'PUT',
                body: new URLSearchParams({
                    name: docName,
                    description,
                    image: imageUrl,
                    author: loggedUser['id'].toString(),
                    last_author: loggedUser['id'].toString(),
                    slug: (changeSlug) ? slug : ''
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })

            let response = await res.json();

            if(response['error']){
                setFlashError(response['error']);
                return;
            }

            Router.push('/Panel/docs');
        }else{
            setFlashError("Don't submit any empty field.")
        }

    }
    /*------------------------------------------------------------------------*/
    

    return (
        <Layout selected="docs">
            <>
                <Head>
                    <title>{docOpened['name']} Editing - Panel</title>
                </Head>

                {flashError &&
                    <Error content={flashError} closeFunction={clearFlashs} />
                }

                <Title content="Edit Doc" />
                <p className={style.subTitle}>Here you can create new documentation about anything you want.</p>

                <div className={style.form}>
                    <label htmlFor="docName">Doc Name:</label>
                    <input id="docName" type="text" value={docName} onChange={(e) => setDocName(e.target.value)} />

                    <label htmlFor="description">Description:</label>
                    <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    
                    <label htmlFor="imageUrl">Image Url:</label>
                    <input id="imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                    <label htmlFor="slug">Slug:</label>
                    <input id="slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    <div className={style.changeSlug}>
                        <input type="checkbox" onClick={() => { setChangeSlug(!changeSlug) }} />
                        <span>Change slug</span>
                    </div>

                    <button className={style.registerButton} onClick={editButton}>Edit</button>
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
    

    /*------------------------Get doc data------------------------------------*/
    const slug = context.query.slug as string;
    let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docBySlug/${slug}`);
    let response = await res.json();
    /*------------------------------------------------------------------------*/
    

    return {
        props:{
            loggedUser: user['userFound'] || null,
            docOpened: response['documentation']
        }
    }
}