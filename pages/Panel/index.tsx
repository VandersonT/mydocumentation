/*----------------IMPORTS-----------------------*/
    import { GetServerSideProps } from 'next';
    import Head from 'next/head';
    import  Router from 'next/router';
    import { destroyCookie, parseCookies } from 'nookies';
import { Title } from '../../components/Title';
    
    //Components
    import { Layout } from '../../Layouts';

    //Css's
    import style from '../../styles/Admin/Panel.module.css';
/*----------------------------------------------*/




const Panel = () => {

    return (
        <Layout selected="dashboard">
            <>
                <Head>
                    <title>Dashboard - Panel</title>
                </Head>
                <main>
                    <Title content="Dashboard" side="left" />
                </main>
            </>
        </Layout>
    )
}

export default Panel;


export const getServerSideProps: GetServerSideProps = async(context) => {

    const cookies = parseCookies(context);

    if(!cookies.token){
        return {
            redirect: {
                destination: '/Panel/login',
                permanent: false,
            },
        }
    }
    
    return {
        props: {
            
        }
    }
}