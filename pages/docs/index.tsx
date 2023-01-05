/*----------------IMPORTS-----------------------*/
import Head from "next/head";
import { useRouter } from "next/router";
import style from '../../styles/Docs.module.css';
import Link from "next/link";
//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
/*----------------------------------------------*/
import { useContext } from "react";
import { Context } from "../../contexts/Context";

const Docs = () => {
    
    const { query } = useRouter(); //query.search

    const { state, dispatch } = useContext(Context);

    return (
        <>
            <Head>
                <title>All Docs - MyDocumentation</title>
                
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

            <Header />

            <main className={style.main}>
                <div className={style.sideBar}>
                    <i className="fa-regular fa-envelope"></i>
                    <h3>Do you want to receive our newsletters?</h3>
                    <p>We will notify you of any relevant news about technology updates</p>

                    <input type="text" placeholder="Enter email here" />
                    <button>Join</button>
                    
                </div>
                <div className={style.docsBox}>
                    <h1>All Docs (4)</h1>
                    <div className={style.docs}>

                        <Link href="/docs/php_documentation">
                            <div className={style.docSingle}>
                                <img src="http://localhost:3000/assets/images/phpIcon.png" />
                                <div className={style.docSingle_Info}>
                                    <h3>Documentação PHP</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum auctor sollicitudin. Ut gravida erat vitae convallis aliquam. Donec ut ex id quam egestas mattis. Duis felis dui, fermentum ut dictum vel, porta at turpis.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/docs/node_documentation">
                            <div className={style.docSingle}>
                                <img src="http://localhost:3000/assets/images/nodeIcon.png" />
                                <div className={style.docSingle_Info}>
                                    <h3>Documentação Node</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum auctor sollicitudin. Ut gravida erat vitae convallis aliquam. Donec ut ex id quam egestas mattis. Duis felis dui, fermentum ut dictum vel, porta at turpis.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/docs/react_documentation">
                            <div className={style.docSingle}>
                                <img src="http://localhost:3000/assets/images/reactIcon.png" />
                                <div className={style.docSingle_Info}>
                                    <h3>Documentação React.js</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum auctor sollicitudin. Ut gravida erat vitae convallis aliquam. Donec ut ex id quam egestas mattis. Duis felis dui, fermentum ut dictum vel, porta at turpis.</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/docs/next_documentation">
                            <div className={style.docSingle}>
                                <img src="http://localhost:3000/assets/images/nextIcon.png" />
                                <div className={style.docSingle_Info}>
                                    <h3>Documentação Next.js</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum auctor sollicitudin. Ut gravida erat vitae convallis aliquam. Donec ut ex id quam egestas mattis. Duis felis dui, fermentum ut dictum vel, porta at turpis.</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Docs;