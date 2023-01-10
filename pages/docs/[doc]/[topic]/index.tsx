/*----------------IMPORTS-----------------------*/
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import style from '../../../../styles/DocSingle.module.css';
import themeMode from '../../../../styles/ThemeMode.module.css';
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../contexts/Context";
import { GetServerSideProps } from "next";
import { Doc } from "../../../../types/Doc";
import { Module } from "../../../../types/Module";
import { Topic } from "../../../../types/Topic";
/*----------------------------------------------*/


type Props = {
    doc: Doc,
    mods: Module[],
    top: Topic[],
    openedTopic: any
}

const Single = ({ doc, mods, top, openedTopic }: Props) => {

    /*----------------STATES-----------------------*/
    const { state, dispatch } = useContext(Context);
    const [ modules, setModules ] = useState<boolean[]>([false]);
    const [ menuMobileStatus, setMenuMobileStatus] = useState(true);
    /*---------------------------------------------*/

    /*----------------EFFECTS-----------------------*/
    useEffect(()=>{
        modules[openedTopic['module_id']-1] = true;//Open the current module.
    },[]);
    /*---------------------------------------------*/

    /*--------------FUNCTIONS----------------------*/
    const openModule = (index: number) => {
        let aux = [];

        for(let i = 0; i < modules.length; i++)
            aux[i] = false;

        (modules[index] === true) ? aux[index] = false : aux[index] = true ;

        setModules(aux);
    }

    const openMenuMobile = () => {
        setMenuMobileStatus(!menuMobileStatus);
    }
    /*---------------------------------------------*/
    
    return (
        <>
            <Head>
                <title>{doc['name']} - MyDocumentation</title>
                
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content="MyDocumentation" />
                <meta name="description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
                <meta name="author" content="Vanderson Tiago de Paulo"/>
                <meta name="keywords" content="" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://localhost:3000/" />
                <meta property="og:title" content="MyDocumentation" />
                <meta property="og:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
                <meta property="og:image" content="http://localhost:3000/assets/imagem/image.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="http://localhost:3000/" />
                <meta property="twitter:title" content="MyDocumentation" />
                <meta property="twitter:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
                <meta property="twitter:image" content="http://localhost:3000/assets/imagem/image.png" />
            </Head>

            <Header link="/docs"/>

            <main className={`${style.main} ${(state.theme.status == 'dark') ? themeMode.mainDark : ''}`}>
                
                <div className={`${style.sideBar} ${(state.theme.status == 'dark') ? themeMode.sideBarDarkS : ''}`}>
                    <div className={`${style.sideBarBox} ${(state.theme.status == 'dark') ? themeMode.sideBarBoxDark : ''}`}>
                        <h3>{doc['name']}</h3>
                        
                        <div className={style.search}>
                            <input type="text" placeholder="Search"/>
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        <button onClick={openMenuMobile} className={style.menuMobileBtn}>
                            {(menuMobileStatus) ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i> }
                            <span>Menu</span>
                        </button>

                        {menuMobileStatus &&
                            <div className={style.module}>

                                {mods.map((module, index) => (
                                    <div key={index} className={`${style.moduleSingle}`}>
                                        <h4 className={style.menuLink} onClick={()=>openModule(index)}>
                                            <span className={style.mark}>{index+1}.</span> {module['title']}
                                        </h4>

                                        {modules[index] &&
                                            <div className={`${style.contentSingle} ${(state.theme.status == 'dark') ? themeMode.contentSingleDark : ''}`}>
                                                
                                                {top.map((top, indexT)=>(
                                                    <div key={indexT}>
                                                        {top['module_id'] === module['id'] &&
                                                            <Link href={`/docs/${doc['slug']}/${top['slug']}`}>
                                                                <p className={`
                                                                    ${style.menuLink}
                                                                    ${(state.theme.status == 'light' && (openedTopic['id'] == top['id'])) ? style.selected : ''}
                                                                    ${(state.theme.status == 'dark' && (openedTopic['id'] == top['id'])) ? themeMode.selectedDark : ''}`}
                                                                >
                                                                    <span className={style.mark}>{index+1}.{indexT+1}.</span> {top['title']}
                                                                </p>
                                                            </Link>
                                                        }
                                                    </div>
                                                ))}

                                            </div>
                                        }
                                    </div>
                                ))}

                            </div>
                        }
                    </div>
                </div>
                
                <div className={`${style.content} ${(state.theme.status == 'dark') ? themeMode.contentDark : ''}`}>
                    {!openedTopic['title'] &&
                        <h2>
                            Essa documentação ainda não tem conteúdo.
                        </h2>
                    }
                    <h1>{openedTopic['title']}</h1>
                    <p>{openedTopic['description']}</p>
                    <div className={`${style.docContent} ${(state.theme.status == 'dark') ? themeMode.docContentDark : ''}`}>
                        {openedTopic['content']}
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
} 

export default Single;

export const getServerSideProps: GetServerSideProps = async(context) => {

    const slug = context.query.doc as string;
    const topicSlug = context.query.topic as string;

    /*Get Doc data*/
    const res = await fetch(`http://localhost:4000/docBySlug/${slug}`);
    const docResponse = await res.json();

    if(docResponse['error'] != "") {
        return {
            redirect: {
            destination: '/docs',
            permanent: false,
            },
        }
    }

    /*Get Doc modules*/
    const resM = await fetch(`http://localhost:4000/moduleByDoc/${docResponse['documentation']['id']}`);
    const moduleResponse = await resM.json();

    /*Get Module topics*/
    const resT = await fetch(`http://localhost:4000/topicByDoc/${docResponse['documentation']['id']}`);
    const topicResponse = await resT.json();

    let openedTopic;
    if(topicResponse['topics'].length > 0){
        openedTopic = topicResponse['topics'].find(function(topic:any) {
            return topic.slug === topicSlug;
        });

        if(!openedTopic){
            openedTopic = topicResponse['topics'][0];
        }
    }else{
        openedTopic = {
            "id": 0,
            "title": "",
            "content": "",
            "module_id": 0,
            "image": "",
            "meta_tags": "",
            "doc_id": 0,
            "slug": ""
        };
    }


    return {
        props: {
            doc: docResponse['documentation'],
            mods: moduleResponse['modulesFound'],
            top: topicResponse['topics'],
            openedTopic
        }
    }
}