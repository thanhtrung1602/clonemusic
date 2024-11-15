"use client";
import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaEllipsisV } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { BsEnvelopeFill } from "react-icons/bs";
import Search from "./search";
import useGet from "@/hooks/useGet";
import { Wrapper } from "../Popper";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IUser } from "@/types/user";
// type Users = {
//   id: number;
//   image: string;
//   name: string;
// };

const contacts = [
  { id: 1, name: "About us" },
  { id: 2, name: "Legal" },
  { id: 3, name: "Copyright" },
  { id: 4, name: "Mobile apps" },
  { id: 5, name: "For Creators" },
  { id: 6, name: "Blog" },
  { id: 7, name: "Jobs" },
  { id: 8, name: "Developers" },
  { id: 9, name: "Support" },
  { id: 10, name: "Keyboard shortcuts" },
  { id: 11, name: "Subscription" },
  { id: 12, name: "Settings" },
];
export default function Header() {
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState(false);
  const refShow = useRef<HTMLDivElement>(null);
  const refContact = useRef<HTMLDivElement>(null);
  const { data: user } = useGet<IUser>("/auth/profile");
  console.log("id: ", user);
  const { data: getOneUser } = useGet<IUser>(`/users/getUserId/${user?.id}`);

  useEffect(() => {
    if (refShow.current && refContact.current) {
      // refShow.current.style.backgroundColor = show ? "#111" : "#333";
      refContact.current.style.backgroundColor = contact ? "#111" : "#333";
    }
  }, [contact]);

  const categories = ["Feed", "Library"];

  return (
    <header className="fixed top-0 z-50 flex h-[46px] w-full items-center justify-center bg-[#333] text-sm leading-normal text-[#ccc]">
      <div className="flex w-[1519.2px] items-center justify-center">
        <div className="block">
          <div className="flex items-center justify-center">
            <div className="flex h-[46px] w-[69px] items-center justify-center bg-[#f50]">
              <a href="/" className="block">
                <Image className="w-full" src={logo} alt="Logo" priority />
              </a>
            </div>
            <nav>
              <ul className="flex items-center justify-center">
                <li className="border-r-[1px] border-[#111]">
                  <Link
                    href="/"
                    className="block h-[46px] w-[104px] cursor-pointer p-3 text-center"
                  >
                    {"Home"}
                  </Link>
                </li>
                {categories.map((category, i) => (
                  <li className="border-r-[1px] border-[#111]" key={i}>
                    <a
                      href=""
                      className="block h-[46px] w-[104px] cursor-pointer p-3 text-center"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="ml-3">
          <Search />
        </div>
        <nav>
          <ul className="ml-2 flex items-center gap-1">
            <li className="px-2 text-[#ff5500]">
              <a href="">Try Next Pro</a>
            </li>
            <li className="px-2 hover:text-[#fff]">
              <a href="">For Artists</a>
            </li>
            <li className="px-2 hover:text-[#fff]">
              <Link href={"/post"}>Upload</Link>
            </li>
          </ul>
        </nav>
        <div>
          <HeadlessTippy
            interactive
            visible={show}
            render={(attrs) => (
              <div
                className="mt-[-9.5px] translate-x-[35px] border border-solid border-[#ccc]"
                {...attrs}
              >
                <Wrapper>
                  <ul className="text-xs font-semibold text-[#333]">
                    <li className="">
                      <Link
                        href={`/profile/${getOneUser?.username}`}
                        className="relative flex h-[32.8px] w-[133.4px] items-center py-2 pr-[10px] hover:bg-[#f2f2f2]"
                      >
                        <FaUser className="block h-5 w-[34px]" />
                        <span className="pl-1">{"Profile"}</span>
                      </Link>
                    </li>
                  </ul>
                </Wrapper>
              </div>
            )}
            onClickOutside={() => setShow(false)}
          >
            <div
              ref={refShow}
              className="flex h-[46px] w-16 cursor-pointer items-center gap-2 pl-2"
              onClick={() => setShow(true)}
            >
              <Image
                width={26}
                height={26}
                src={
                  getOneUser?.image
                    ? getOneUser.image
                    : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                }
                className="w-[26px] rounded-full"
                alt={`${getOneUser?.username}`}
                priority
              />
              <FaChevronDown className="w-[10px] hover:text-[#fff]" />
            </div>
          </HeadlessTippy>
        </div>
        <div className="flex items-center justify-between pl-2 text-xl">
          <span className="flex h-[46px] w-[46px] items-center justify-center px-3">
            <FaBell className="cursor-pointer hover:text-[#fff] size-5" />
          </span>
          <span className="flex h-[46px] w-[46px] items-center justify-center px-3">
            <BsEnvelopeFill className="cursor-pointer hover:text-[#fff] size-5" />
          </span>
          <HeadlessTippy
            interactive
            visible={contact}
            render={(attrs) => (
              <div
                className="mt-[-9.5px] translate-x-[-62px] border border-solid border-[#ccc] bg-[#fff]"
                {...attrs}
              >
                <ul className="w-[168.4px] text-xs font-semibold text-[#333]">
                  {contacts.map((contact) => {
                    return (
                      <li key={contact.id}>
                        <a
                          href=""
                          className="block h-[32.8px] px-[10px] py-2 hover:bg-[#f2f2f2]"
                        >
                          {contact.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            onClickOutside={() => setContact(false)}
          >
            <span
              ref={refContact}
              className="flex h-[46px] w-[46px] items-center justify-center px-3 text-2xl leading-[1.5]"
              onClick={() => setContact(true)}
            >
              <FaEllipsisV className="cursor-pointer hover:text-[#fff] size-5" />
            </span>
          </HeadlessTippy>
        </div>
      </div>
    </header>
  );
}
