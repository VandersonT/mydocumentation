import Link from 'next/link';
import { useState } from 'react';
import Title2 from '../../../../components/Title2';
import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/DocSingle.module.css';

const Doc = () => {

    const [ topicBoxOpened, setTopicBoxOpened ] = useState([false]);
    const [ topicOpened, setTopicOpened ] = useState([false]);


    const openTopicBox = (index: number) => {
        /*Reset Topics Status*/
        setTopicOpened([false]);

        /*Close all and open just clicked TopicBox*/
        let aux = [false];
        aux[index] = true;
        setTopicBoxOpened(aux);
    } 

    const openTopic = (index: number) => {
        /*Close all and open just clicked topic*/
        let aux = [false];
        aux[index] = true;
        setTopicOpened(aux);
    }

    return (
        <Layout>
            <>
                <Title2 content="PHP Documentation" returnPath="/Panel/docs" />

                <div className={style.modulesBox}>
                    
                    <div className={style.moduleSingle}>
                        <div className={style.moduleSingle_title} onClick={() => openTopicBox(0)}>
                            <h3>Iniciando com PHP</h3>
                            <i className="fa-solid fa-minus"></i>
                        </div>

                        {topicBoxOpened[0] &&
                            <div className={style.menuToggle}>
                                <div className={style.moduleOptions}>
                                    <button>Rename module</button>
                                    <button className={style.deleteColor}>Delete module</button>
                                </div>
                                
                                <div className={style.link}>
                                    <p onClick={() => openTopic(0)}>O que é PHP</p>

                                    {topicOpened[0] &&
                                        <div className={style.linkOptions}>
                                            <Link href="/">
                                                <button>View</button>
                                            </Link>
                                            <button>Rename</button>
                                            <button className={style.deleteColor}>Delete</button>
                                        </div>
                                    }
                                </div>
                                <div className={style.link}>
                                    <p onClick={() => openTopic(1)}>Como baixar e instalar</p>

                                    {topicOpened[1] &&
                                        <div className={style.linkOptions}>
                                            <Link href="/">
                                                <button>View</button>
                                            </Link>
                                            <button>Rename</button>
                                            <button className={style.deleteColor}>Delete</button>
                                        </div>
                                    } 
                                </div>
                            </div>
                        }

                    </div>

                    <div className={style.moduleSingle}>
                        <div className={style.moduleSingle_title} onClick={() => openTopicBox(1)}>
                            <h3>Iniciando com PHP</h3>
                            <i className="fa-solid fa-minus"></i>
                        </div>

                        {topicBoxOpened[1] &&
                            <div className={style.menuToggle}>
                                <div className={style.moduleOptions}>
                                    <button>Rename module</button>
                                    <button className={style.deleteColor}>Delete module</button>
                                </div>

                                <div className={style.link}>
                                    <p onClick={() => openTopic(0)}>O que é PHP</p>

                                    {topicOpened[0] &&
                                        <div className={style.linkOptions}>
                                            <Link href="/">
                                                <button>View</button>
                                            </Link>
                                            <button>Rename</button>
                                            <button className={style.deleteColor}>Delete</button>
                                        </div>
                                    }

                                </div>
                                <div className={style.link}>
                                    <p onClick={() => openTopic(1)}>Como baixar e instalar</p>

                                    {topicOpened[1] &&
                                        <div className={style.linkOptions}>
                                            <Link href="/">
                                                <button>View</button>
                                            </Link>
                                            <button>Rename</button>
                                            <button className={style.deleteColor}>Delete</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        }

                    </div>

                </div>
            </>
        </Layout>
    );
}

export default Doc;