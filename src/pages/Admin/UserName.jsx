import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserName = ({id}) => {
    const [response, setResponse] = useState({})
    useEffect(()=>{
        const fetchUserDetails = async()=>{
            try{
                const {data} = await axios.get(`/api/v1/auth/user-by-id/${id}`)
                setResponse(data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchUserDetails()
    },[])
  return (
    <div>{response.name}</div>
  )
}

export default UserName