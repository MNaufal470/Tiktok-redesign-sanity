import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="navbar md:sticky md:top-0">
      <div>
        <Link href={"/"}>
          <img
            src="http://wpkixx.com/html/pitnik/images/logo2.png"
            alt=""
            className="md:w-full w-[75px] object-contain cursor-pointer"
          />
        </Link>
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <div>
            <form
              onSubmit={handleSearch}
              className=" md:mr-5 relative flex items-center"
            >
              <input
                type="text"
                className="inputSearch md:w-[300px] w-[225px] md:text-[13px] text-[10px]"
                placeholder="Search People And Videos"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
              <button className="absolute md:right-5 right-6  border-l-2 border-gray-300 pl-1 md:text-xl text-sm text-gray-400 ">
                <BiSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
