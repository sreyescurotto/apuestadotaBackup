import React, { useEffect } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import { useState } from "react";

import Image from "next/image";

import AppService from "../../services/app.service";

import Selector from "../Lenguage/Selector";


const Navbar = (props) => {

  const navbar = props.navbar 

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  const handleClick = (event) => {
    setIsOpen((current) => !current);
  };

  const logOut = () => {
    localStorage.clear();

    router.push("/");
  };

  useEffect(() => {
    let s = new AppService();

    let _user = s.getUser();

    if (_user !== null) setUser(_user);
  }, []);

  return (
    <>
      <div className={isOpen ? "menu-navigation-media" : "media-navbar"}>
        <div className="menu-navigation-x">
          <Image
            className="close-bw"
            src="/icons/close-b.png"
            onClick={handleClick}
            alt="close button"
            width={24}
            height={24}
          />
        </div>

        <div className="menu-navigation-links">
          <Link  href="/play/normal" locale={router.locale}>
            <a className="anchor">
            {navbar.play}
            </a>
            
          </Link>

          <Link  href="/profile" locale={router.locale}>
            <a className="anchor">
              {navbar.profile}
            </a>
          </Link>

          <Link href="/deposit" locale={router.locale}>
            <a className="anchor">
            {navbar.deposit}
            </a> 
          </Link>

          <Link  href="/withdraw" locale={router.locale}>
            <a className="anchor">
              {navbar.withdraw}
            </a>
          </Link>

          <Link  href="/tutorial" locale={router.locale}>
            <a className="anchor">
              {navbar.tutorial}
            </a>
          </Link>

          <Link  href="/rules" locale={router.locale}>
            <a className="anchor">
              {navbar.rules}
            </a>
          </Link>
        </div>

        <hr className="nav-divider"></hr>

        {user == null && (
          <div className="menu-navigation-btn">
            <Link href={"/login"} locale={router.locale}>
              <a className="anchor">{navbar.login}</a>
            </Link>
          </div>
        )}

        {user !== null && (
          <div className="menu-navigation-btn">
            <button
              className="btn outline"
              onClick={() => {
                logOut();
              }}
            >
              {navbar.leave}
            </button>
          </div>
        )}
      </div>

      <div className="navbar play-navbar">
        <Link href={"/"} locale={router.locale}>
          <a>
            <Image
              src="/apuesta-logo.png"
              alt="logo"
              className="logo"
              height={30}
              width={210}
            />
          </a>
        </Link>

        <div className="right-c">

       
          <Selector />
          {user == null && (
          <div className="log-buttons">
            <Link href={"/login"} locale={router.locale}>
              <a>
                <button className="btn outline">{navbar.login}</button>
              </a>
            </Link>
          </div>
        )}
          {user !== null && (
            <div className="log-buttons">
              <div
                className={
                  user.dni_status === 2
                    ? "profile-photo verified"
                    : "profile-photo noverified"
                }
              >
                <Link href={"/profile"} locale={router.locale}>
                  <a>
                    <img
                      src={user.foto}
                      alt={user.dni_status}
                      className="round-profile-img"
                    />
                  </a>
                </Link>
              </div>

            <button className="btn btn-md">{navbar.title} {user.nickname}</button>

            <button
              className="btn outline"
              onClick={() => {
                logOut();
              }}
            >
              {navbar.leave}
            </button>
          </div>
        )}
        </div>

        <div className="menu-button">
          <a onClick={handleClick}>
            <Image src="/icons/menu-g.png" alt="menu" width={24} height={24} />
          </a>
        </div>
      </div>

      <style jsx>
        {`
          .log-buttons {
            display: flex;

            align-items: center;
          }

          .profile-photo {
            width: 55px;

            height: 55px;

            overflow: hidden;

            border-radius: 50%;

            margin-right: 1.5rem;

            cursor: pointer;

            transition: all 0.3s ease;
          }

          .round-profile-img {
            width: 100%;

            height: 100%;

            object-fit: cover;
          }

          .verified {
            border: 3px solid #b6ff40;
          }

          .noverified {
            border: 3px solid rgba(255, 255, 255, 0.5);
          }

          .profile-photo:hover {
            border-color: #fff;
          }

          @media screen and (max-width: 485px) {
            .log-buttons {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
