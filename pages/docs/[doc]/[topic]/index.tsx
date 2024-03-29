/*----------------------------Imports-------------------------------------*/
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
import { systemStatus } from "../../../../helpers/systemStatus";
import HTMLReactParser from "html-react-parser";
import { checkView } from "../../../../helpers/checkView";
import { sendViewToDoc } from "../../../../helpers/sendViewToDoc";
/*------------------------------------------------------------------------*/


/*----------------------------Types---------------------------------------*/
type Props = {
    doc: Doc,
    mods: Module[],
    top: Topic[],
    openedTopic: any
}
/*------------------------------------------------------------------------*/

const Single = ({ doc, mods, top, openedTopic }: Props) => {

    /*-----------------------------States-------------------------------------*/
    const { state, dispatch } = useContext(Context);
    const [ modules, setModules ] = useState<boolean[]>([false]);
    const [ modulesMirror, setModulesMirror ] = useState<Module[]>([]);
    const [ topicsMirror, setTopicsMirror ] = useState<Topic[]>([]);
    const [ menuMobileStatus, setMenuMobileStatus] = useState(true);
    const [ searchTopic, setSearchTopic ] = useState('');
    const [ markedTopic, setMarkedTopic ] = useState(0);
    const [ topicWasFound, setTopicWasFound ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState('');
    /*------------------------------------------------------------------------*/


    /*----------------------------UseEffects----------------------------------*/
    useEffect(()=>{
        setModulesMirror(mods);
        setTopicsMirror(top);

        /*Open the module of the currently topic open.*/
        for(let i = 0; i < mods.length; i++)
            if(mods[i]['id'] == openedTopic['module_id'])
                modules[i] = true;
            
    },[]);
    /*------------------------------------------------------------------------*/


    /*---------------------------Functions------------------------------------*/
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

    const handlerSearchTopic = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTopic(e.currentTarget.value);
    }

    const HaddlerSearchTopic = () => {
        if(searchTopic != ""){

            setTopicWasFound(false);
            setErrorMessage(`No result for  "${searchTopic}". Try again with a different keyword.`)
            
            for(let i = 0; i < top.length; i++){
                if(top[i]['title'].indexOf(searchTopic) != -1){
                    setTopicWasFound(true);
                    for(let j = 0; j < mods.length; j++){
                        if(mods[j]['id'] == top[i]['module_id']){
                            setModulesMirror([ mods[j] ]);
                            setMarkedTopic(top[i]['id']);
                        }
                    }
                    break;
                }
            }
            setModules([true]);

        }else{
            setModulesMirror(mods);
            setMarkedTopic(0);
            setTopicWasFound(true);
        }

    }
    /*------------------------------------------------------------------------*/

    
    return (
        <>
            <Head>
                <title>{openedTopic['title']} - MyDocumentation</title>
                
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content={openedTopic['title']+" - MyDocumentation"} />
                <meta name="description" content={openedTopic['description']} />
                <meta name="author" content="Vanderson Tiago de Paulo"/>
                <meta name="keywords" content={openedTopic['meta_tags']} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/docs`} />
                <meta property="og:title" content={openedTopic['title']+" - MyDocumentation"} />
                <meta property="og:description" content={openedTopic['description']} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/imagem/image.png`} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/docs`} />
                <meta property="twitter:title" content={openedTopic['title']+" - MyDocumentation"} />
                <meta property="twitter:description" content={openedTopic['description']} />
                <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/imagem/image.png`} />
            </Head>

            <Header link="/docs"/>

            <main className={`${style.main} ${(state.theme.status == 'dark') ? themeMode.mainDark : ''}`}>
                
                <div className={`${style.sideBar} ${(state.theme.status == 'dark') ? themeMode.sideBarDarkS : ''}`}>
                    <div className={`${style.sideBarBox} ${(state.theme.status == 'dark') ? themeMode.sideBarBoxDark : ''}`}>
                        <h3>{doc['name']}</h3>
                        
                        <div className={style.search}>
                            <input type="text" placeholder="Search" value={searchTopic} onChange={handlerSearchTopic}/>
                            <button onClick={HaddlerSearchTopic}><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        <button onClick={openMenuMobile} className={`${style.menuMobileBtn} ${(state.theme.status == 'dark') ? themeMode.menuMobileBtnDark : ''}`}>
                            {(menuMobileStatus) ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i> }
                            <span className={(state.theme.status == 'dark') ? themeMode.menuBtnDark : ''}>Menu</span>
                        </button>

                        {menuMobileStatus &&
                            <div className={`${style.module} ${(state.theme.status == 'dark') ? themeMode.moduleDark : ''}`}>
                                
                                {!topicWasFound &&
                                    <p className={style.topicNotFound}>{errorMessage}</p>
                                }
                                
                                {topicWasFound &&
                                    <>
                                        {modulesMirror.map((module, index) => (
                                            <div key={index} className={`${style.moduleSingle}`}>
                                                <h4 className={style.menuLink} onClick={()=>openModule(index)}>
                                                    <span className={style.mark}>{index+1}.</span> {module['title']}
                                                </h4>

                                                {modules[index] &&
                                                    <div className={`${style.contentSingle} ${(state.theme.status == 'dark') ? themeMode.contentSingleDark : ''}`}>
                                                        
                                                        {topicsMirror.map((top, indexT)=>(
                                                            <div key={indexT}>
                                                                {top['module_id'] === module['id'] &&
                                                                    <Link href={`/docs/${doc['slug']}/${top['slug']}`}>
                                                                        <p className={`
                                                                            ${style.menuLink}
                                                                            ${(state.theme.status == 'light' && (openedTopic['id'] == top['id'])) ? style.selected : ''}
                                                                            ${(state.theme.status == 'dark' && (openedTopic['id'] == top['id'])) ? themeMode.selectedDark : ''}
                                                                            ${(top['id'] === markedTopic) ? style.markedTopic : ''}`}
                                                                        >
                                                                            {top['title']}
                                                                        </p>
                                                                    </Link>
                                                                }
                                                            </div>
                                                        ))}

                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </>
                                }

                            </div>
                        }
                    </div>
                </div>
                
                <div className={`${style.content} ${(state.theme.status == 'dark') ? themeMode.contentDark : ''}`}>
                    {!openedTopic['title'] &&
                        <h2 className={`${style.flash} ${(state.theme.status == 'dark') ? themeMode.flashDark : ''}`}>
                            This documentation has no content yet.
                        </h2>
                    }
                    <h1>{openedTopic['title']}</h1>
                    <p className={style.description}>{openedTopic['description']}</p>
                    <div className={`${style.docContent} ${(state.theme.status == 'dark') ? themeMode.docContentDark : ''}`}>
                        {HTMLReactParser(openedTopic['content'])}
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
} 

export default Single;

export const getServerSideProps: GetServerSideProps = async(context) => {

    /*----------------Check if the system is active.--------------------------*/
    let systemActive = await systemStatus();
  
    if(!systemActive)
      return {
          redirect: {
              destination: '/error',
              permanent: false,
          },
      }
    /*------------------------------------------------------------------------*/


    /*-------------------------Get url data-----------------------------------*/
    const slug = context.query.doc as string;
    const topicSlug = context.query.topic as string;
    /*------------------------------------------------------------------------*/

    /*Check View*/
    await checkView(context);
    
    /*-------------Try to connect to api and get the data---------------------*/
    let docResponse;
    let moduleResponse;
    let topicResponse;
    let openedTopic;
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docBySlug/${slug}`);
        docResponse = await res.json();

        if(!docResponse['documentation']) {
            return {
                redirect: {
                destination: '/404',
                permanent: false,
                },
            }
        }

        /*Get Doc modules*/
        const resM = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/moduleByDoc/${docResponse['documentation']['id']}`);
        moduleResponse = await resM.json();

        /*Get Module topics*/
        const resT = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/topicByDoc/${docResponse['documentation']['id']}`);
        topicResponse = await resT.json();

        
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

        /*Send view for this doc*/
        await sendViewToDoc(context, docResponse['documentation']['id'], slug);
        
        return {
            props: {
                doc: docResponse['documentation'],
                mods: moduleResponse['modulesFound'],
                top: topicResponse['topics'],
                openedTopic
            }
        }
    }catch(error){
        return {
            redirect: {
            destination: '/error',
            permanent: false,
            },
        }
        
    }
    /*------------------------------------------------------------------------*/
}