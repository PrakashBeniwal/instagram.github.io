import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentuser, setCurrentuser] = useState(
        JSON.parse(localStorage.getItem('user'))
    )

    const login = async (email, password) => {
        const res = await fetch('http://localhost:5544/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email, username: email,
                password
            })

        });

        const result = await res.json();
        if (result.problem) {
            alert(result.problem)
        }
        else {

            setCurrentuser(result.user)
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            console.log(result)
        }

    }

    const logout = () => {
        setCurrentuser([]);
        localStorage.clear();
    }
    return (

        <AuthContext.Provider value={{ login, currentuser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}