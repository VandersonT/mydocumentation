/*----------------IMPORTS-----------------------*/
    import { GetServerSideProps } from 'next';
    import  Router from 'next/router';
    import { destroyCookie, parseCookies } from 'nookies';
    //Css's
    import style from '../../styles/Admin/Panel.module.css';
/*----------------------------------------------*/




const Panel = () => {
    
    const logOut = () => {
        destroyCookie(undefined, 'token');
        Router.push('/Panel/login');
    }

    return (
        <>
            <p className={style.teste}>trr</p>
            <button onClick={logOut}>sair</button>
        </>
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