/*----------------IMPORTS-----------------------*/
import Head from "next/head";
import { useRouter } from "next/router";
import style from '../../styles/Docs.module.css';
import themeMode from '../../styles/ThemeMode.module.css';
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../../contexts/Context";
import { Doc } from "../../types/Doc";
//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
/*----------------------------------------------*/

type Props = {
    docs: Doc[]
}

const Docs = ({ docs }: Props) => {
    
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

            <main className={`${style.main} ${(state.theme.status == 'dark') ? themeMode.mainDark : ''}`}>
                <div className={`${style.sideBar} ${(state.theme.status == 'dark') ? themeMode.sideBarDark : ''}`}>
                    <i className="fa-regular fa-envelope"></i>
                    <h3>Do you want to receive our newsletters?</h3>
                    <p>We will notify you of any relevant news about technology updates</p>

                    <input type="text" placeholder="Enter email here" />
                    <button>Join</button>
                    
                </div>
                <div className={`${style.docsBox} ${(state.theme.status == 'dark') ? themeMode.docsBoxDark : ''} `}>
                    <h1>All Docs ({docs.length})</h1>
                    <div className={style.docs}>
                        
                        {docs.map((doc, index) => (
                            <Link href="/docs/php_documentation">
                                <div className={`${style.docSingle} ${(state.theme.status == 'dark') ? themeMode.docSingleDark : ''}`}>
                                    <img src={doc['image']} />
                                    <div className={`${style.docSingle_Info} ${(state.theme.status == 'dark') ? themeMode.docSingle_InfoDark : ''}`}>
                                        <h3>{doc['name']}</h3>
                                        <p>{doc['description']}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Docs;

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:4000/docs');
    const docsResponse = await res.json();

    return {
        props: {
            docs: docsResponse['docs']
        }
    }
}