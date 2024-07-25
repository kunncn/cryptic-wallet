import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ButtonComponent from "./Button.component";
import { motion, AnimatePresence } from "framer-motion";
import ContainerComponent from "./Container.component";
import PageTransitionComponent from "./PageTransition.component";

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const nav = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (!menuRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onClickHandler = (nav) => {
    setIsOpen(false);
    nav("/auth/register");
  };

  useEffect(() => {
    const handleDocumentClick = (event) => handleClickOutside(event);
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [isOpen]);

  return (
    <>
      <ContainerComponent>
        <PageTransitionComponent>
          <div className="relative flex justify-between items-center p-6">
            <div>
              <Link to="/">
                <div>
                  <img
                    className="w-[270px]"
                    src={logo}
                    alt="cryptic wallet logo"
                  />
                </div>
              </Link>
            </div>
            <div className="md:flex items-center">
              <div className="md:flex hidden ms-auto me-[100px]">
                <a href="#features" className=" font-bold text-[15px]">
                  Features
                </a>
              </div>
              <div className="md:flex hidden gap-[30px]">
                <ButtonComponent
                  onClick={() => nav("/auth/token/obtain")}
                  className="bg-secondary text-black hover:bg-[#ebebeb] border-primary  text-[15px] font-bold tracking-wider"
                >
                  Sign in
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => nav("/auth/register")}
                  className="blue-btn"
                >
                  Register
                </ButtonComponent>
              </div>
            </div>
            <div className="md:hidden flex items-center scale-[0.85]">
              <ButtonComponent
                onClick={() => nav("/auth/register")}
                className="mr-4 bg-primary hover:bg-[#014CEC]  text-[16px] font-bold tracking-wider"
              >
                Register
              </ButtonComponent>
              <button
                className="flex items-center justify-center"
                onClick={toggleMenu}
              >
                <i className="pi pi-bars text-[30px]"></i>
              </button>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -200 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 px-5"
                  ref={menuRef}
                >
                  <div className="w-full flex justify-end mb-5">
                    <button onClick={toggleMenu}>
                      <i className="pi pi-times text-[30px] mt-[10px] mr-[15px]"></i>
                    </button>
                  </div>
                  <a
                    onClick={toggleMenu}
                    href="#features"
                    className=" font-bold text-[15px] mb-4 w-full text-center"
                  >
                    Features
                  </a>
                  <ButtonComponent
                    onClick={() => nav("/auth/token/obtain")}
                    className="w-full bg-secondary text-black hover:bg-[#ebebeb] border-primary  text-[16px] font-bold tracking-wider mb-4 rounded-lg flex justify-center md:block"
                  >
                    Sign in
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => {
                      toggleMenu();
                      onClickHandler(nav);
                    }}
                    className="w-full blue-btn rounded-lg flex justify-center md:block"
                  >
                    Register
                  </ButtonComponent>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PageTransitionComponent>
      </ContainerComponent>
      <PageTransitionComponent>
        <div className="w-full h-[0.1px] bg-gray-300"></div>
      </PageTransitionComponent>
    </>
  );
};

export default NavBarComponent;
