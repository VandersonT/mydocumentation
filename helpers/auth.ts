export const authentication = async (token: any) => {
    /*Check if there is a token*/
    if(!token){
        return {
            redirect: {
                destination: '/Panel/login',
                permanent: false,
            },
        }
    }
    
    /*Search for user using token*/
    let res = await fetch('http://localhost:4000/auth', {
        method: 'POST',
        body: new URLSearchParams({token}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });

    let user = await res.json();

    return user;
}