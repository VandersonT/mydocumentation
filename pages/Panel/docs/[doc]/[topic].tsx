/*--------------------------------Imports---------------------------------*/
import { Layout } from "../../../../Layouts";
const Jodit = dynamic(() => import('./Jodit'), { ssr: false })
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next';
import nookies, { destroyCookie, parseCookies } from "nookies";
import { authentication } from "../../../../helpers/auth";
import { User } from "../../../../types/User";
import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import style from '../../../../styles/Admin/Topic.module.css';
import Error from "../../../../components/Error";
import Success from "../../../../components/Success";
import Head from "next/head";
/*------------------------------------------------------------------------*/


/*---------------------------------Types----------------------------------*/
type Props = {
    loggedUser: User,
    topic: any,
    doc: any
}
/*------------------------------------------------------------------------*/


const Docs = ({ loggedUser, topic, doc }: Props) => {
    
    /*--------------------------------States----------------------------------*/
    const [ changeSlug, setChangeSlug ] = useState(false);
    const [ title, setTitle ] = useState(topic['title']);
    const [ metaTags, setMetaTags ] = useState(topic['meta_tags']);
    const [ description, setDescription ] = useState(topic['description']);
    const [ slug, setSlug ] = useState(topic['slug']);
    const [ content, setContent ] = useState('');
    const [ flashSucces, setFlashSuccess ] = useState('');
    const [ flashError, setFlashError ] = useState('');
    /*------------------------------------------------------------------------*/


    /*-----------------------------UseEffects---------------------------------*/
    
    /*------------------------------------------------------------------------*/


    /*------------------------------Functions---------------------------------*/
    const getContent = (content: string) => {
        setContent(content);
    }

    const saveTopic = async () => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only edit a topic in a documentation that you created.')
            return false;
        }

        let res = await fetch(`http://localhost:4000/topic/${topic['id']}`,{
            method: 'PUT',
            body: new URLSearchParams({
                content,
                title,
                metaTags,
                description,
                slug: (changeSlug) ? slug : ''
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
        let response = await res.json();
        
        if(response['error'])
            setFlashError('Oops!! An error has occurred.');
        else
            setFlashSuccess('You have successfully saved this topic.');
    }

    const closeFlashs = () => {
        setFlashSuccess('');
        setFlashError('');
    }
    /*------------------------------------------------------------------------*/

    return (
        <Layout selected="docs">
            <>
                <Head>
                    <title>{topic['title']} - Panel</title>
                </Head>
                {flashError &&
                    <Error content={flashError} closeFunction={closeFlashs} />
                }
                {flashSucces &&
                    <Success content={flashSucces} closeFunction={closeFlashs} />
                }

                <section className={style.mainTitle}>
                    <Link href="/Panel/docs/php_documentation"><i className="fa-solid fa-rotate-left"></i></Link>
                    <h1>{topic['title']} <i className={`fa-solid fa-pen-to-square ${style.editIcon}`}></i></h1>
                    <button className={style.save} onClick={saveTopic}>Save</button>
                </section>

                <section className={style.metaTags}>
                    <h3>Meta Tags</h3>
                    <div className={style.struct}>
                        <div className={style.col}>
                            <input type="text" placeholder="Type a title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            <textarea placeholder="Type a description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div className={style.col}>
                            <input type="text" placeholder="Type a slug" value={slug} onChange={(e)=>setSlug(e.target.value)}/>
                            <div className={style.changeSlug}>
                                <input type="checkbox" onClick={() => { setChangeSlug(!changeSlug) }}/>
                                <span>Change Slug</span>
                            </div>
                            <textarea placeholder="type metatags here (ex: carro, veiculo)" value={metaTags} onChange={(e)=>setMetaTags(e.target.value)}></textarea>
                        </div>
                    </div>
                </section>

                <Jodit sendContent={getContent} defaultContent={topic['content']} />

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


    /*--------------------Get Doc Data--------------------------------------*/
    const slugDoc = context.query.doc as string;
    const resDoc = await fetch(`http://localhost:4000/docBySlug/${slugDoc}`);
    let docResponse = await resDoc.json();
    /*------------------------------------------------------------------------*/


    /*--------------------Get Topic Data--------------------------------------*/
    const slugTopic = context.query.topic as string;
    const res = await fetch(`http://localhost:4000/topicBySlug/${slugTopic}`);
    let topicResponse = await res.json();
    /*------------------------------------------------------------------------*/

    
    return {
        props:{
            loggedUser: user['userFound'] || null,
            topic: topicResponse['topicFound'],
            doc: docResponse['documentation']
        }
    }
}