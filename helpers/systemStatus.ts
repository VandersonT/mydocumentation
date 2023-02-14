export const systemStatus = async () => {
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/system`);
    let systemStatus = await res.json();

    if(systemStatus['systemStatus']['is_active'])
        return true;
    else
        return false;
}