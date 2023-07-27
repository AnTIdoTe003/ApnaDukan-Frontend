/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    const getDetails = async ()=>{
      try{
        const {data}= await axios.get('/api/v1/auth/get-user-details')
        setAuth({...auth, user:data.data, token:data.token});
      }catch(error){
        console.log(error)
      }
    }
    getDetails()
  },[]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
