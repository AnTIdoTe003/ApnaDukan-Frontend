import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  FaUserAlt,
  FaSearch,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import SearchProducts from "../SearchProducts/SearchProducts";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [auth, setAuth] = useAuth();
  const cartItems = useSelector((state)=>{
    return state.cart.items
  })
  const toast = useToast();
  const logOut = async () => {
    const { data } = await axios.get("/api/v1/auth/logout");
    if (data.success) {
      setAuth({ ...auth, user: {}, token: "" });
      toast({
        title: "You are logged out",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (searchKey) {
      const getSearchProduct = async () => {
        try {
          const { data } = await axios.get(
            `/api/v1/product/search-products?query=${searchKey}`
          );
          setSearchData(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSearchProduct();
    } else {
      setSearchData([]);
    }
  }, [searchKey]);

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <h3>Apna Dukan</h3>
            </div>
            <div className="nav-search">
              <input
                type="text"
                placeholder="Search your product....."
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <FaSearch
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></FaSearch>
              {searchKey && <SearchProducts searchData={searchData} />}
            </div>
            <div className="nav-menu">
              {!auth.token ? (
                <p>Hey User</p>
              ) : (
                <p>Hey {auth.user.name.split(" ")[0]}</p>
              )}
              <Menu>
                <MenuButton style={{ background: "transparent" }} as={Button}>
                  <FaUserAlt
                    style={{
                      color: "#676C7B",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  ></FaUserAlt>
                </MenuButton>
                {!auth.token ? (
                  <>
                    <MenuList>
                      <Link to={"/register"}>
                        <MenuItem>Register</MenuItem>
                      </Link>
                      <MenuDivider></MenuDivider>
                      <Link to={"/login"}>
                        <MenuItem>Login</MenuItem>
                      </Link>
                    </MenuList>
                  </>
                ) : (
                  <>
                    <MenuList>
                      <Link
                        to={`dashboard/${
                          auth.user.role === 1 ? "admin" : "user"
                        }`}
                      >
                        <MenuItem>Dashboard</MenuItem>
                      </Link>
                      <Link to={"/"}>
                        <MenuItem onClick={logOut}>LogOut</MenuItem>
                      </Link>
                    </MenuList>
                  </>
                )}
              </Menu>
              <FaRegHeart
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></FaRegHeart>
              <Link to={'/my-cart'}>
              <FaShoppingCart
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              ></FaShoppingCart>
              </Link>
              <p>{cartItems.length}</p>
            </div>
          </div>
          <div className="nav-content-mob">
            <div className="nav-menu-mob">
              <DrawerMenu></DrawerMenu>
              <FaUserAlt
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
              ></FaUserAlt>
              <FaRegHeart
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
              ></FaRegHeart>
              <FaShoppingCart
                style={{
                  color: "#676C7B",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
              ></FaShoppingCart>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
