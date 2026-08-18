"use client";
import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  const {} = session.data || {};

  const isLoggedIn = session.status === "authenticated";

  const link = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink href={"/dashboard"}>Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Image
            height={200}
            width={200}
            alt="lead gen logo"
            src={"/assets/logo.png"}
          ></Image>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end space-x-2">
        {isLoggedIn ? (
          <>
            <button onClick={() => signOut()} className="btn btn-outline">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" href={"/login"}>
              Login
            </Link>
            <Link className="btn btn-outline" href={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
