/*------------------------------Imports---------------------------------*/
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Title2 from '../../../../components/Title2';
import { authentication } from '../../../../helpers/auth';
import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/DocSingle.module.css';
import { User } from '../../../../types/User';
import Error from '../../../../components/Error';
import Success from '../../../../components/Success';
import Head from 'next/head';
/*------------------------------------------------------------------------*/


/*-------------------------------Types------------------------------------*/
type Props = {
    loggedUser: User,
    doc: any,
    mods: any,
    tops: any,
}
/*------------------------------------------------------------------------*/


const Doc = ({ loggedUser, doc, mods, tops }: Props) => {

    /*---------------------------State------------------------------------*/
    const [ topicBoxOpened, setTopicBoxOpened ] = useState([false]);
    const [ topicOpened, setTopicOpened ] = useState([false]);
    const [ modules, setModules ] = useState(mods);
    const [ topics, setTopics ] = useState(tops);
    const [ flashError, setFlashError ] = useState('');
    const [ flashSuccess, setFlashSuccess ] = useState('');
    /*------------------------------------------------------------------------*/


    /*--------------------------UseEffects------------------------------------*/
    
    /*------------------------------------------------------------------------*/


    /*---------------------------Functions------------------------------------*/
    const clearFlashs = () => {
        setFlashError('');
        setFlashSuccess('');
    }

    const openTopicBox = (index: number) => {
        /*Reset Topics Status*/
        setTopicOpened([false]);

        /*Close all and open just clicked TopicBox*/
        let aux = [false];

        if(!topicBoxOpened[index])
            aux[index] = true;
        
        
        setTopicBoxOpened(aux);
    } 

    const openTopic = (index: number) => {
        /*Close all and open just clicked topic*/
        let aux = [false];
        aux[index] = true;
        setTopicOpened(aux);
    }

    const newModuleAction = async () => {
        
        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only create a module in a documentation that you created.')
            return false;
        }
        
        let moduleName = prompt("Choose a name for this doc.");

        if(moduleName){
            if(confirm('Are you sure you want to create this module?')){

                let res = await fetch('http://localhost:4000/module',{
                    method: 'POST',
                    body: new URLSearchParams({title: moduleName, doc_id: doc['id']}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                let response = await res.json();

                if(response['error']){
                    setFlashError(response['error']);
                    return;
                }
                
                modules.push(response['newModule']);
                setFlashSuccess('Module created successfully.');
            }
        }
        
    }

    const deleteModule = (moduleId: number, index: number) => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only delete a document created by yourself.')
            return false;
        }

        if(!confirm('Are you sure you want to delete this module?'))
            return;
        
        /*Remove item from database with all its topics*/
        fetch(`http://localhost:4000/module/${moduleId}`, {
            method: 'DELETE'
        });

        /*Remove item from array*/
        modules.splice(index, 1);

        setFlashSuccess('Module deleted successfully.')
    }

    const renameModule = (moduleId: number, index: number) => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only rename a module in a documentation that you created.')
            return false;
        }

        let newName = prompt("What's the new name of this module?");

        if(newName){

            fetch(`http://localhost:4000/module/${moduleId}`,{
                method: 'PUT',
                body: new URLSearchParams({title: newName}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })

            /*Rename in array*/
            let aux = modules;
            aux[index]['title'] = newName;
            setModules([...aux]);

            setFlashSuccess('Module name successfully changed.')
        }else{
            setFlashError('You must submit a name.')
        }

    }

    const slugGenerate = () => {
        let first = Math.random().toString(36).substring(0, 6)
        let firstFormated = first.slice(2, 6);

        let secound = Math.random().toString(36).substring(0, 18)
        let secoundFormated = secound.slice(2, 18);

        return firstFormated+'_'+secoundFormated;
    }

    const newTopic = async (moduleId: string) => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only create a topic in a documentation that you created.')
            return false;
        }

        let newTopicName = prompt("What's the topic name?");


        if(newTopicName){
            let slug = slugGenerate();

            let res = await fetch('http://localhost:4000/topic', {
                method: 'POST',
                body: new URLSearchParams({
                    title: newTopicName as string,
                    content: 'No content yet',
                    module_id: moduleId,
                    image: 'none',
                    metaTags: 'example',
                    doc_id: doc['id'],
                    slug: slug,
                    description: 'No descriiption yet'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            let response = await res.json();

            topics.push(response['createdTopic'])
            setFlashSuccess('Topic successfully created.');

        }


    }

    const renameTopic = (topicId: number, index: number) => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only rename a topic in a documentation that you created.')
            return false;
        }

        let newTopicName = prompt("What's the new topic name?");

        if(newTopicName){

            fetch(`http://localhost:4000/topic/${topicId}`,{
                method: 'PUT',
                body: new URLSearchParams({
                    title: newTopicName as string,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            /*Rename in array*/
            let aux = topics;
            aux[index]['title'] = newTopicName;
            setTopics([...aux]);
            setFlashSuccess('Topic name successfully changed.')

        }else{
            setFlashError('You must privide us with a name.');
        }

    }

    const deleteTopic = (topicId: number, index: number) => {

        if(loggedUser['position'] == "1" && doc['author'] != loggedUser['id']){
            setFlashError('You can only delete a topic in a documentation that you created.')
            return false;
        }

        if(confirm('Are you sure you want to delete this topic?')){
            fetch(`http://localhost:4000/topic/${topicId}`, {
                method: 'DELETE'
            });

            /*Remove item from array*/
            topics.splice(index, 1);
            setFlashSuccess('Topic deleted successfully.');
        }

    }
    /*------------------------------------------------------------------------*/

    return (
        <Layout>
            <>
                <Head>
                    <title>{doc['name']} - Panel</title>
                </Head>

                {flashError &&
                    <Error content={flashError} closeFunction={clearFlashs} />
                }

                {flashSuccess &&
                    <Success content={flashSuccess} closeFunction={clearFlashs} />
                }

                <Title2 content={doc['name']} returnPath="/Panel/docs" buttonPath="/Panel/docs/newDoc" />

                <div className={style.modulesBox}>            
                    
                    {(modules.length < 1) && <p className={style.warning}>
                        We didn't find any modules.<br/>
                        If you want to create now,
                        <span className={style.clickHere} onClick={newModuleAction}> click here</span>
                    </p> }

                    {(modules.length > 0) &&
                    <>
                        <p className={style.newModule} onClick={newModuleAction}>New Module</p>
                        {modules.map((module: any, index: any) => (
                            <div className={style.moduleSingle} key={index}>
                                <div className={style.moduleSingle_title} onClick={() => openTopicBox(index)}>
                                    <h3>{module['title']}</h3>
                                    <i className="fa-solid fa-gear"></i>
                                </div>

                                {topicBoxOpened[index] &&
                                    <div className={style.menuToggle}>
                                        <div className={style.moduleOptions}>
                                            <button onClick={() => renameModule(module['id'], index)}>Rename module</button>
                                            <button onClick={() => newTopic(module['id'])}>New Topic</button>
                                            <button className={style.deleteColor} onClick={() => deleteModule(module['id'], index)}>Delete module</button>
                                        </div>
                                        
                                        {topics.length > 0 && <>
                                            {topics.map((topic: any, index: any) => (
                                                module['id'] == topic['module_id'] &&
                                                    <div className={style.link} key={index}>
                                                        <p onClick={() => openTopic(index)}>{topic['title']}</p>

                                                        {topicOpened[index] &&
                                                            <div className={style.linkOptions}>
                                                                <Link href={`/Panel/docs/${doc['slug']}/${topic['slug']}`}>
                                                                    <button>View</button>
                                                                </Link>
                                                                <button onClick={() => renameTopic(topic['id'], index)}>Rename</button>
                                                                <button onClick={ () => deleteTopic(topic['id'], index) } className={style.deleteColor}>Delete</button>
                                                            </div>
                                                        }
                                                    </div>
                                            ))}
                                        </>}

                                    </div>
                                }

                            </div>
                        ))}
                    </>
                    }

                </div>
            </>
        </Layout>
    );
}

export default Doc;


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



    /*----------------------Get doc data--------------------------------------*/
    const slug = context.query.doc as string;
    const res = await fetch(`http://localhost:4000/docBySlug/${slug}`);
    let docResponse = await res.json();

    
    if(!docResponse['documentation']) 
        return {
            redirect: {
            destination: '/404',
            permanent: false,
            },
        }
    /*------------------------------------------------------------------------*/



    /*---------------------Get doc module-------------------------------------*/
    const resM = await fetch(`http://localhost:4000/moduleByDoc/${docResponse['documentation']['id']}`);
    let moduleResponse = await resM.json();
    /*------------------------------------------------------------------------*/
    


    /*---------------------Get Module topics----------------------------------*/
    const resT = await fetch(`http://localhost:4000/topicByDoc/${docResponse['documentation']['id']}`);
    let topicResponse = await resT.json();
    /*------------------------------------------------------------------------*/

    
    return {
        props:{
            loggedUser: user['userFound'] || null,
            doc: docResponse['documentation'],
            mods: moduleResponse['modulesFound'],
            tops: topicResponse['topics']
        }
    }
}