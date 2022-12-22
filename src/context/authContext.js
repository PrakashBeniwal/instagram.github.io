import {createContext,useState} from "react";
export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [currentuser, setCurrentuser] = useState(
        JSON.parse(localStorage.getItem('user'))
    )

    const login=async(email,password)=>{
        const res=await fetch('http://localhost:5544/api/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:email,username:email,
                password
            })
        
        });

        const result=await res.json();
        setCurrentuser(result.user)
        localStorage.setItem('token',result.token)
        localStorage.setItem('user',JSON.stringify(result.user))
        console.log(result)
       if (result.problem) {
        alert(result.problem)
       }

    }
    
    const logout=()=>{
        setCurrentuser([]);
        localStorage.clear();
    }
   

//    useEffect(() => {
//     //  localStorage.setItem("data",JSON.stringify(currentuser))
    
//    }, [currentuser])
   
return(
   
    <AuthContext.Provider value={{login,currentuser,logout}}>
         {children}      
    </AuthContext.Provider>
    

)
}