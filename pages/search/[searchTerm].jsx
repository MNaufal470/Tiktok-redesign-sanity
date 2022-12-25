import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";
import Head from "next/head";
import VideoCard from "../../components/VideoCard/VideoCard";
import NoResults from "../../components/NoResults/NoResults";
import { GoVerified } from "react-icons/go";
const Search = ({ videos }) => {
  const [showUser, setShowUser] = useState(true);
  const router = useRouter();
  const { searchTerm } = router.query;
  const { allUsers } = useAuthStore();
  const searchedAccounts = allUsers?.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  const userVideos = showUser
    ? "bg-[#fa6342] text-[white]"
    : "bg-gray-300 text-[#515365]";
  const account = showUser
    ? "bg-gray-300 text-[#515365]"
    : "bg-[#fa6342] text-[white]";
  return (
    <div className="mt-10 md:w-[370px] lg:w-[600px] px-5 md:px-0  min-h-screen  rounded-lg bg-white ">
      <Head>
        <title>Tiktok Redesign | 2022</title>
        <link rel="icon" href="https://wpkixx.com/html/pitnik/images/fav.png" />
      </Head>
      <div className="py-5  flex items-center justify-center space-x-7 border-bottom">
        <p
          className={`py-2 px-8 text-sm  rounded-full font-semibold cursor-pointer ${userVideos}`}
          onClick={() => setShowUser(true)}
        >
          Videos
        </p>
        <p
          className={`py-2 px-8 text-sm  rounded-full font-semibold cursor-pointer ${account}`}
          onClick={() => setShowUser(false)}
        >
          Accounts
        </p>
      </div>
      {showUser ? (
        <div className="mt-10 flex flex-col space-y-5">
          {videos?.length > 0 ? (
            videos.map((post, i) => <VideoCard post={post} key={i} />)
          ) : (
            <NoResults
              text={`No videos result for ${searchTerm}`}
              icon="userVideos"
            />
          )}
        </div>
      ) : (
        <div className="mt-5  flex flex-col space-y-5">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user, i) => (
              <Link href={`/profile/${user._id}`}>
                <div
                  className="flex items-center gap-x-2 pb-4 pl-5 cursor-pointer border-bottom"
                  key={i}
                >
                  <img
                    src={user.image}
                    alt=""
                    className="rounded-full border-2   md:inline-block w-[75px] h-[75px]"
                  />
                  <div>
                    <p className="text-[#515365] font-semibold text-[14px] flex gap-x-1 items-center">
                      {user.userName.replace(/\s+/g, "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No Account Results for ${searchTerm}`}
              icon="account"
            />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data },
  };
};
export default Search;
