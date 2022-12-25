import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../../store/authStore";
import { createOrGetUser } from "../../utils";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";

const Suggest = () => {
  const { userProfile, addUser, removeUser, fetchAllUsers, allUsers } =
    useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers, suggestUser]);
  const suggestUser = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className="mt-5 md:mt-0 flex  justify-center px-5 md:px-0 md:sticky md:top-[40px] z-0">
      <div className="w-full  md:w-[260px]  bg-white rounded-lg">
        <div className="flex justify-between items-center border-bottom">
          <p className="titleProfile p-4">
            {userProfile ? "Profile" : "Sign in"}
          </p>
          {userProfile && (
            <button
              type="button"
              className=" border-2 p-2 rounded-full cursor-pointer outline-none mr-3"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={15} />
            </button>
          )}
        </div>
        {/* Profile User */}
        <Link href={`/profile/${userProfile?._id}`}>
          <div className="p-4 pb-1 cursor-pointer">
            {userProfile ? (
              <div className="flex items-center gap-x-2  pb-4">
                <img
                  src={userProfile.image}
                  alt=""
                  className="rounded-full border-2 w-[50px] h-[50px] object-cover"
                />
                <div>
                  <p className="text-[#515365] font-semibold text-[12px] flex gap-x-1 items-center">
                    {userProfile.userName.replace(/\s+/g, "")}
                    <GoVerified className="text-blue-400" />
                  </p>

                  <p className="capitalize text-gray-400 text-xs">
                    {userProfile.userName}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-col justify-center mb-5 space-y-2">
                <GoogleLogin
                  onSuccess={(response) => {
                    createOrGetUser(response, addUser);
                  }}
                  onError={() => {
                    console.log("error");
                  }}
                  cookiePolicy="single_host_origin"
                  width="200"
                  className="mx-auto"
                />
                <p className="text-center text-sm text-gray-400">
                  Sign in to upload your moment, comments and like the videos{" "}
                </p>
              </div>
            )}
          </div>
        </Link>
        {/* Show User Explore Or Liked */}
        <div className="p-4 pt-1  ">
          <div className="flex justify-center space-x-3 border-bottom pb-5">
            <Link href={"/"}>
              <button className={`buttonProfile  bg-[#fa6342] text-[#fff]`}>
                Explore
              </button>
            </Link>
          </div>
        </div>
        {/* Suggest Aacount */}
        <div className="p-4">
          <div className="border-bottom">
            <p className="titleProfile  p-4">Sugessted Account</p>
          </div>
          <div className="pt-4">
            {suggestUser.map((user, i) => (
              <Link href={`/profile/${user._id}`} key={i}>
                <div className="mt-3 flex items-center gap-x-2 pb-4 cursor-pointer hover:border-r-2 hover:border-[#fa6342]">
                  <img
                    src={user.image}
                    alt=""
                    className="rounded-full border-2   md:inline-block w-[34px] h-[34px]"
                  />
                  <div>
                    <p className="text-[#515365] font-semibold text-[12px] flex gap-x-1 items-center">
                      {user.userName.replace(/\s+/g, "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
