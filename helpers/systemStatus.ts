export const systemStatus = async () => {
    
    let res = await fetch('http://localhost:4000/system');
    let systemStatus = await res.json();

    if(systemStatus['systemStatus']['is_active'])
        return true;
    else
        return false;
}