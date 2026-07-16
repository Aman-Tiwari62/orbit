import { useEffect } from "react"
const baseURL = import.meta.env.VITE_BASE_URL
export const useAuthHook = ()=>{
    console.log('useAuthhook called')
    useEffect(()=>{
        console.log("useEffect triggered.. inside useAuthHook..");
        async function fetchUser(){
            try{
                const response = await fetch(baseURL);
                const data = await response.json();
                console.log(data);
                console.log(data.message);
            } catch(error){
                console.log(error);
            }
        }
        fetchUser();
    }, []);
}