import { createContext, useEffect, useReducer } from "react"

 const Initialvalue={
    email : JSON.parse(localStorage.getItem("admin")) || null ,
    loading: false,
    error: null
 }

export const AuthContext= createContext(Initialvalue)

const AuthReducer=(state,action)=> {
    switch(action.type){
        case "Login_Start":
            return{
                email: null,
                loading: true,
                error: false,
            }
            case "Login_Success":
                return{
                    email: action.payload,
                    loading: false,
                    error: false,
                }
                case "Login_Fail":
                    return{
                        email: null,
                        loading: false,
                        error: action.payload,
                    }
                    case "Log_Out":
                        return{
                            email: null,
                            loading: false,
                            error: false,
                        }
                        default:
                       return  state
    }
}


export const AuthProvider =({children})=>{
    const [state, dispatch]= useReducer(AuthReducer, Initialvalue)
 
    useEffect(() => {
    
        localStorage.setItem("admin", JSON.stringify(state.email))
    }, [state.email])

    return (<AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>)
}























