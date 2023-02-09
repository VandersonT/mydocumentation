/*----------------------------------Imports-------------------------------*/
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import nookies, { parseCookies } from "nookies";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { authentication } from "../../helpers/auth";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Media.module.css';
import { User } from "../../types/User";
/*------------------------------------------------------------------------*/



/*-------------------------------------Types------------------------------*/
type Props = {
    loggedAdmin: User
}
/*------------------------------------------------------------------------*/



/*------------------------------------------------------------------------*/

const Media = ({ loggedAdmin }: Props) => {


    /*--------------------------------States----------------------------------*/
    /*------------------------------------------------------------------------*/



    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    /*------------------------------------------------------------------------*/

    return (
        <Layout selected="media">
            <>
                <Head>
                    <title>Media - Panel</title>
                </Head>
                <Title content="Media" />

                <div className={style.menuBar}>
                    <select>
                        <option>All media</option>
                    </select>
                    <button>Delete All</button>
                </div>

                <section className={style.mediaBox}>
                    <div className={style.newMedia}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <Link href="/Panel/mediaOpened">
                        <img src="http://localhost:3000/assets/images/mediaTest.png" className={style.mediaSingle} />
                    </Link>
                    <Link href="/">
                        <img src="http://localhost:3000/assets/images/mediaTest.png" className={style.mediaSingle} />
                    </Link>
                </section>

            </>
        </Layout>
    )
}

export default Media;



export const getServerSideProps: GetServerSideProps = async(context) => {
    
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

    
    return {
        props: {
            loggedAdmin: user['userFound'] || null,
        }
    }
}