import cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import { setCookie, parseCookies } from 'nookies';
import nookies, { destroyCookie } from 'nookies'

const teste = ({ teste }: any) => {

    const criaCookie = () => {
        setCookie(null, 'theme', 'dark', {
            maxAge: 86400 * 30,
            path: '/',
        })
    }
    const removeCookie = () => {
        cookie.remove("theme");
        console.log('remove cookie')
    }

    return (
        <>
            <button onClick={criaCookie}>Cria cookie</button><br/>
            <button onClick={removeCookie}>remove cookie</button><br/>

            <br/><hr/><br/>
            {"-> "+teste}
        </>
    )

}

export default teste;

export const getServerSideProps: GetServerSideProps = async(context) => {
    let teste = '';


    nookies.set(context, 'theme', 'value', {
        maxAge: -1,
        path: '/',
    });
    return {
        props: {
            teste: teste
        }
    }
}