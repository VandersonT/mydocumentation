/*--------------------------------Imports---------------------------------*/
import style from '../../styles/Admin/mediaOpened.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { authentication } from '../../helpers/auth';
import nookies, { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { User } from '../../types/User';
/*------------------------------------------------------------------------*/



/*-----------------------------------Types--------------------------------*/
type Props = {
    loggedAdmin: User
}
/*------------------------------------------------------------------------*/



const mediaOpened = ({ loggedAdmin }: Props) => {


    /*--------------------------------States----------------------------------*/
    /*------------------------------------------------------------------------*/



    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    /*------------------------------------------------------------------------*/

    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.header}>
                    <h3>Attachment details</h3>
                    <button>
                        <Link href="/Panel/media">
                            <Image
                                src="/assets/images/close.png" alt="close"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </button>
                </div>
                <div className={style.contentBox}>
                    <div className={style.content}>
                        <Image
                            src="/assets/images/media.png" alt="close"
                            width={616}
                            height={359}
                        />
                        <button>Delete</button>
                    </div>
                    <div className={style.sidebar}>
                        <div className={style.fieldSingle}>
                            <p>Title</p>
                            <input type="text" />
                        </div>
                        <div className={style.fieldSingle}>
                            <p>Alternative Text</p>
                            <input type="text" />
                        </div>
                        <div className={style.url}>
                            <p>File Url</p>
                            <input type="text" value="http://localhost/wordpress/wp-content/upload" disabled />
                            <button>Copy URL to clipboard</button>
                        </div>
                        <hr/>
                        <button className={style.saveChanges}>Save Changes</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default mediaOpened;



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
            loggedAdmin: user['userFound'],
        }
    }
}