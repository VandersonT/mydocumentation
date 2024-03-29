
/*-------------------------------Imports----------------------------------*/
import Link from 'next/link';

//Css's
import style from '../styles/Error.module.css';
/*------------------------------------------------------------------------*/




const apiError = () => {

    /*--------------------------------States----------------------------------*/
    /*------------------------------------------------------------------------*/



    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    /*------------------------------------------------------------------------*/

    
    return (
        <>
            <section className={style.main}>
                <img className={style.leftImg} src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/errorImg1.png`} alt="" />
                <div className={style.errorBox}>
                    <img src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/OpssError.png`} alt="" />
                    <h1>Important Anouncement</h1>
                    <p>We are currently experiencing technical difficulties with our system.
                    Which may mean you are unable to view pages. We’re working as quickly
                    as possible to solve the issue, and apologise for any inconveniece caused. </p>
                    <Link href="/">
                        <button>Go to Home</button>
                    </Link>
                </div>
                <img className={style.rightImg} src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/errorImg2.png`} alt="" />
            </section>
        </>
    );
}

export default apiError;