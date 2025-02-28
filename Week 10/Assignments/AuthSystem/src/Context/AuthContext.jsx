import {createContext,useContext,useState} from 'react';




  const UserContext=createContext();
  const CheckContext=createContext();

function AuthContext({children}){

    const [users,getUsers]=useState({
        name:'',
        password:''
      })
      
      const [checked1,SetChecked1]=useState(false);
      
      return <>
      <UserContext.Provider value={{
        users:users,
        getUsers:getUsers
      }}>
        <CheckContext.Provider value={{
            checked1:checked1,
            SetChecked1:SetChecked1
        }}>
            {children}
        </CheckContext.Provider>
      </UserContext.Provider>
      </>
}

export const useAuth = () => useContext(UserContext);
export const useCAuth = () => useContext(CheckContext);
export default AuthContext