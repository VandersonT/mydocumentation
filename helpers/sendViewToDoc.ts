import nookies, { parseCookies, setCookie } from "nookies";

export const sendViewToDoc = async (context: any, docId: string, slug: string) => {

    let ip = 'none';

    const cookies = nookies.get(context);

    if(!cookies.hasOwnProperty(slug)){
        
        /*Set a cookie to remember this user*/
        nookies.set(context, slug, 'true', {
            maxAge: 86400 * 30,
            path: '/',
        })

        /*Send to the database this view*/
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/docView`, {
            method: 'POST',
            body: new URLSearchParams({ip, docId}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
        
    }

}