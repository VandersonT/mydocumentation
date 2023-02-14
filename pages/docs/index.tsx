/*----------------------------Imports-------------------------------------*/
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
import { GetServerSideProps } from "next";
import { systemStatus } from "../../helpers/systemStatus";
/*------------------------------------------------------------------------*/


/*-----------------------------Types--------------------------------------*/
type Props = {
    docs: Doc[],
    search: string
}
/*------------------------------------------------------------------------*/

const Docs = ({ docs,search }: Props) => {
    

    /*------------------------States------------------------------------------*/
    const { state, dispatch } = useContext(Context);
    /*------------------------------------------------------------------------*/


    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    /*------------------------------------------------------------------------*/


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
                <meta property="og:url" content={process.env.NEXT_PUBLIC_SYSTEMURL} />
                <meta property="og:title" content="MyDocumentation" />
                <meta property="og:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/imagem/image.png`} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={process.env.NEXT_PUBLIC_SYSTEMURL} />
                <meta property="twitter:title" content="MyDocumentation" />
                <meta property="twitter:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
                <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/imagem/image.png}`} />
            </Head>

            <Header link="/"/>
            
            <main className={`${style.main} ${(state.theme.status == 'dark') ? themeMode.mainDark : ''}`}>
                <div className={`${style.sideBar} ${(state.theme.status == 'dark') ? themeMode.sideBarDark : ''}`}>
                    <i className="fa-regular fa-envelope"></i>
                    <h3>Do you want to receive our newsletters?</h3>
                    <p>We will notify you of any relevant news about technology updates</p>

                    <input type="text" placeholder="Enter email here" />
                    <button>Join</button>
                    
                </div>
                <div className={`${style.docsBox} ${(state.theme.status == 'dark') ? themeMode.docsBoxDark : ''} `}>
                    <h1>{(search) ? `Results for "${search}"` : 'All Docs'} ({docs.length})</h1>
                    <div className={style.docs}>
                        
                        {docs.length > 0 &&
                            <>
                                {docs.map((doc, index) => (
                                    <Link key={index} href={`/docs/${doc['slug']}/none`}>
                                        <div className={`${style.docSingle} ${(state.theme.status == 'dark') ? themeMode.docSingleDark : ''}`}>
                                            <img src={doc['image']} />
                                            <div className={`${style.docSingle_Info} ${(state.theme.status == 'dark') ? themeMode.docSingle_InfoDark : ''}`}>
                                                <h3>{doc['name']}</h3>
                                                <p>{doc['description']}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {/*<div className={style.paginateBox}>
                                    <span className={`${style.pageButton} ${style.selectedPage}`}>1</span>
                                    <span className={style.pageButton}>2</span>
                                    <span className={style.pageButton}>3</span>
                                </div>*/}
                            </>
                        }

                        {(search && docs.length < 1) &&
                            <>
                                <p className={style.noDoc}>No documentation for "{search}".</p> 
                                <p className={style.noDoc}>Try again with a different keyword.</p>
                            </>
                        }

                        {(!search && docs.length < 1) &&
                            <>
                                <p className={style.noDoc}>I'm very sorry! but we don't have any documentation available.</p> 
                                <p className={style.noDoc}>Try another day again.</p>
                            </>
                        }

                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Docs;

export const getServerSideProps: GetServerSideProps = async (context) => {

    /*------------------Check if the system is active.------------------------*/
    let systemActive = await systemStatus();
  
    if(!systemActive)
      return {
          redirect: {
              destination: '/error',
              permanent: false,
          },
      }
    /*------------------------------------------------------------------------*/


    /*----------------------try to get data-----------------------------------*/
    let search = context.query.search as string;


    let res;
    let docsResponse;
    let docs;
    try{
        if(search){
            res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docByName/${search}`);
            docsResponse = await res.json();
            docs = docsResponse['docFound'];
        }else{
            search = '';
            res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docs`);
            docsResponse = await res.json();
            docs = docsResponse['docs'];
        }

        return {
            props: {
                docs,
                search
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