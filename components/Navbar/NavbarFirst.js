import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import AppService from "../../services/app.service";
import Selector from "../Lenguage/Selector";



// export async function getStaticProps({ locale }) {
//   const response = await import(`../../lang/${locale}.json`);
//   return {
//     props: {
//       navbar: response.default.navbar,
//     },
//   };
// }

const NavbarFirst = (props) => {

  const navbar  = props.props;

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleClick = (event) => {
    setIsOpen((current) => !current);
  };

  const logOut = () => {
    localStorage.clear();

    location.href = "/";
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
          <Link href="/play/normal" locale={router.locale}>
            <a className="anchor">{props.play}</a>
          </Link>

          <Link href="/profile" locale={router.locale}>
            <a className="anchor">{navbar.profile}</a>
          </Link>

          <Link href="/deposit" locale={router.locale}>
            <a className="anchor">{navbar.deposit}</a>
          </Link>

          <Link href="/withdraw" locale={router.locale}>
            <a className="anchor">{navbar.withdraw}</a>
          </Link>

          <Link href="/tutorial" locale={router.locale}>
            <a className="anchor">{navbar.tutorial}</a>
          </Link>

          <Link href="/rules" locale={router.locale}>
            <a className="anchor">{navbar.terms}</a>
          </Link>

          <Link href="/monetize" locale={router.locale}>
            <a className="anchor">{navbar.monetize}</a>
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

      <div className="navbar main-navbar-desktop">
        <Link href={"/"} locale={router.locale}>
          <a>
            <Image src="/apuesta-logo.png" alt="logo" className="logo" height={30} width={210} />
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
            <Image src="/icons/menu-g.png" alt="menu" width={24}
            height={24} />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavbarFirst;
