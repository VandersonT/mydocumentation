/*----------------IMPORTS-----------------------*/
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import style from '../../styles/DocSingle.module.css';
import themeMode from '../../styles/ThemeMode.module.css';
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { Context } from "../../contexts/Context";
/*----------------------------------------------*/

const Single = () => {

    /*----------------STATES-----------------------*/
    const { state, dispatch } = useContext(Context);
    const [ modules, setModules ] = useState<boolean[]>([false, false, false]);
    const [ menuMobileStatus, setMenuMobileStatus] = useState(true);
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
                <title>PHP Documentation - MyDocumentation</title>
                
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

            <Header/>

            <main className={`${style.main} ${(state.theme.status == 'dark') ? themeMode.mainDark : ''}`}>
                
                <div className={`${style.sideBar} ${(state.theme.status == 'dark') ? themeMode.sideBarDarkS : ''}`}>
                    <div className={`${style.sideBarBox} ${(state.theme.status == 'dark') ? themeMode.sideBarBoxDark : ''}`}>
                        <h3>PHP Documentation</h3>
                        
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

                                <div className={`${style.moduleSingle} ${(state.theme.status == 'dark') ? themeMode.sideBarDarkS : ''}`}>
                                    <h4 className={style.menuLink} onClick={()=>openModule(0)}>
                                        <span className={style.mark}>1.</span> Iniciando com PHP
                                    </h4>
                                    
                                    {modules[0] &&
                                        <div className={`${style.contentSingle} ${(state.theme.status == 'dark') ? themeMode.contentSingleDark : ''}`}>
                                            <Link href="/">
                                                <p className={`${style.menuLink} ${(state.theme.status == 'light') ? style.selected : themeMode.selectedDark}`}><span className={style.mark}>1.1.</span> Instalando Ambiente</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.2.</span> Instalando PhpMyAdmin</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>1.3.</span> Instalando Xamp</p>
                                            </Link>
                                        </div>
                                    }
                                </div>

                                <div className={style.moduleSingle}>
                                    <h4 className={style.menuLink} onClick={()=>openModule(1)}>
                                        <span className={style.mark}>2.</span> Bancos de Dados
                                    </h4>

                                    {modules[1] &&
                                        <div className={`${style.contentSingle} ${(state.theme.status == 'dark') ? themeMode.contentSingleDark : ''}`}>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>2.1.</span> Instalando Ambiente</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>2.2.</span> Instalando Ambiente</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>2.3.</span> Instalando Ambiente</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>2.4.</span> Instalando PhpMyAdmin</p>
                                            </Link>
                                        </div>
                                    }
                                </div>

                                <div className={style.moduleSingle}>
                                    <h4 className={style.menuLink} onClick={()=>openModule(2)}>
                                        <span className={style.mark}>3.</span> Iniciando com PHP
                                    </h4>

                                    {modules[2] &&
                                        <div className={`${style.contentSingle} ${(state.theme.status == 'dark') ? themeMode.contentSingleDark : ''}`}>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>3.1.</span> Instalando Ambiente</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>3.2.</span> Padrão Mvc Model View Controller teste</p>
                                            </Link>
                                            <Link href="/">
                                                <p className={style.menuLink}><span className={style.mark}>3.3.</span> Instalando Ambiente</p>
                                            </Link>
                                        </div>
                                    }
                                </div>

                            </div>
                        }
                    </div>
                </div>
                
                <div className={`${style.content} ${(state.theme.status == 'dark') ? themeMode.contentDark : ''}`}>
                    <h1>Instalando Ambiente</h1>
                    <p>Instalando e configurando todo o ambiente de desenvolvimento inicial em php.</p>
                    <div className={`${style.docContent} ${(state.theme.status == 'dark') ? themeMode.docContentDark : ''}`}>
                        Teste de conteudo aleatorio para encher linguiça
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
} 

export default Single;