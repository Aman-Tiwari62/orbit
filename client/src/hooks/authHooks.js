import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser, clearUser} from "../features/auth/authSlice"

const baseURL = import.meta.env.VITE_BASE_URL

export const useAuthHook = () => {
    const dispatch = useDispatch();

    // FOR DEBUGGING:
    console.log('useAuth called...');

    useEffect(() => {
        console.log('useEffect inside useAuth....')
        async function fetchUser() {
            try {
                // Ensure cookies are sent if you are using HttpOnly cookies
                const response = await fetch(`${baseURL}/user/me`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error("Session invalid or expired");
                }

                const data = await response.json();
                
                // Assuming your backend sends the user object in data.user or directly as data
                const userData = data.user || data; 
                
                // Update state: sets user, isAuthenticated to true, and checkingAuth to false
                dispatch(setUser(userData)); 

            } catch (error) {
                console.error("Auth verification failed:", error.message);
                // Wipe any old state and drop checkingAuth to false so App can render the login screen
                dispatch(clearUser()); 
            }
        }

        fetchUser();
    }, [dispatch]);
}