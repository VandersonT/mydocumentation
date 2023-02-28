import nookies, { parseCookies, setCookie } from "nookies";

export const checkView = async (context: any) => {

    const cookies = nookies.get(context);
    if(!cookies.viewed){
        /*Set cookie to tag this user*/
        nookies.set(context, 'viewed', 'true', {
            maxAge: 86400 * 30,
            path: '/',
        })
        /***/

        /*Get User Ip*/
        let ip = 'none';
        /***/

        /*Send view to the database*/
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/view`, {
            method: 'POST',
            body: new URLSearchParams({ip}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
        /***/
    }

}