import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./auth";

const WishlistContext = createContext()

const WishlistProvider = ({childre})=>{
    const [wishlist, setWishlist] = useState([])
    const[auth] = useAuth()
    useEffect(()=>{
        const fetchWishlistData = async()=>{
            try{

                const {data} = await axios.get(`api/v1/auth/get-user-details`)
                setWishlist(data.data.wishlist)

            }catch(error){
                console.log(error)
            }
        }
        fetchWishlistData()
    },[auth.token])
    return(
        <WishlistContext.Provider value={[wishlist, setWishlist]}>
            {childre}
        </WishlistContext.Provider>
    )
}

const useWishlist = ()=>useContext(WishlistContext)

export {useWishlist, WishlistProvider}
