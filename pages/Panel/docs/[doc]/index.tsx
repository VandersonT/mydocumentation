import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Title2 from '../../../../components/Title2';
import { authentication } from '../../../../helpers/auth';
import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/DocSingle.module.css';
import { User } from '../../../../types/User';
import Error from '../../../../components/Error';
import Success from '../../../../components/Success';

type Props = {
    loggedUser: User,
    doc: any,
    mods: any,
    tops: any,
}

const Doc = ({ loggedUser, doc, mods, tops }: Props) => {

    const [ topicBoxOpened, setTopicBoxOpened ] = useState([false]);
    const [ topicOpened, setTopicOpened ] = useState([false]);
    const [ modules, setModules ] = useState(mods);
    const [ topics, setTopics ] = useState(tops);
    const [ flashError, setFlashError ] = useState('');
    const [ flashSuccess, setFlashSuccess ] = useState('');

    useEffect(()=>{
        if(!loggedUser){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])

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
        let moduleName = prompt('teste');

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
        }else{
            setFlashError('You must provide us with a name.');
        }
        

        //console.log('nome do novo modulo: '+moduleName+' e pertence a doc: '+doc['id'])
    }

    const deleteModule = (moduleId: number, index: number) => {

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

    return (
        <Layout>
            <>

                {flashError &&
                    <Error content={flashError} closeFunction={clearFlashs} />
                }

                {flashSuccess &&
                    <Success content={flashSuccess} closeFunction={clearFlashs} />
                }

                <Title2 content={doc['name']} returnPath="/Panel/docs" />

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
                                            <button>Rename module</button>
                                            <button>New Topic</button>
                                            <button className={style.deleteColor} onClick={() => deleteModule(module['id'], index)}>Delete module</button>
                                        </div>
                                        
                                        {topics.length > 0 && <>
                                            {topics.map((topic: any, index: any) => (
                                                module['id'] == topic['module_id'] &&
                                                    <div className={style.link} key={index}>
                                                        <p onClick={() => openTopic(index)}>{topic['title']}</p>

                                                        {topicOpened[index] &&
                                                            <div className={style.linkOptions}>
                                                                <Link href="/Panel/docs/php_documentation/teste">
                                                                    <button>View</button>
                                                                </Link>
                                                                <button>Rename</button>
                                                                <button className={style.deleteColor}>Delete</button>
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

    /*Try to authenticate*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);

    /*Get doc data*/
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

    /*Get doc module*/
    const resM = await fetch(`http://localhost:4000/moduleByDoc/${docResponse['documentation']['id']}`);
    let moduleResponse = await resM.json();
    
    /*Get Module topics*/
    const resT = await fetch(`http://localhost:4000/topicByDoc/${docResponse['documentation']['id']}`);
    let topicResponse = await resT.json();

    return {
        props:{
            loggedUser: user['userFound'] || null,
            doc: docResponse['documentation'],
            mods: moduleResponse['modulesFound'],
            tops: topicResponse['topics']
        }
    }
}