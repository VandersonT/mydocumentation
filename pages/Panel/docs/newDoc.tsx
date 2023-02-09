/*----------------------------Imports-------------------------------------*/
import { Layout } from "../../../Layouts";
import style from '../../../styles/Admin/NewDoc.module.css';
import dynamic from 'next/dynamic'
import { Title } from "../../../components/Title";
import { useEffect, useState } from "react";
import Error from "../../../components/Error";
import Router from "next/router";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import {authentication} from '../../../helpers/auth';
import { User } from "../../../types/User";
/*------------------------------------------------------------------------*/


/*-----------------------------Types--------------------------------------*/
type Props = {
    loggedUser: User
}
/*------------------------------------------------------------------------*/


const Docs = ({ loggedUser }: Props) => {

    /*-----------------------------States-------------------------------------*/
    const [ docName, setDocName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ slug, setSlug ] = useState('');
    const [ flashError, setFlashError ] = useState('');
    /*------------------------------------------------------------------------*/


    /*---------------------------UseEffects-----------------------------------*/

    /*------------------------------------------------------------------------*/

    
    /*---------------------------Functions------------------------------------*/
    const clearFlashs = () => {
        setFlashError('');
    }

    const registerDoc = async () => {
        if(docName && description && imageUrl && slug){
            
            let res = await fetch('http://localhost:4000/doc',{
                method: 'POST',
                body: new URLSearchParams({
                    name: docName,
                    description,
                    image: imageUrl,
                    author: loggedUser['id'].toString(),
                    last_author: loggedUser['id'].toString(),
                    slug
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

            {flashError &&
                <Error content={flashError} closeFunction={clearFlashs} />
            }

            <Title content="Add New Doc" />
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

                    <button className={style.registerButton} onClick={registerDoc}>Register</button>
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
    
    return {
        props:{
            loggedUser: user['userFound'] || null
        }
    }
}