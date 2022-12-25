import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { GoVerified } from "react-icons/go";
import VideoCard from "../../components/VideoCard/VideoCard";
import NoResults from "../../components/NoResults/NoResults";
import { useRouter } from "next/router";
const Profile = ({ data }) => {
  const { user, userVideos, userLikedVideos } = data;
  const router = useRouter();
  const { query } = router;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);
  const videos = showUserVideos
    ? "bg-[#fa6342] text-[white]"
    : "bg-gray-300 text-[#515365]";
  const liked = showUserVideos
    ? "bg-gray-300 text-[#515365]"
    : "bg-[#fa6342] text-[white]";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };
    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos, data, videosList, query]);

  return (
    <div className="pb-[120px]">
      <Head>
        <title>Tiktok Redesign | 2022</title>
        <link rel="icon" href="https://wpkixx.com/html/pitnik/images/fav.png" />
      </Head>
      <div className="mt-10 md:w-[370px] lg:w-[600px] px-5 md:px-0  min-h-screen  rounded-lg bg-white ">
        <div className="w-full  flex items-center justify-center flex-col space-y-3 p-5 rounded-lg  bg-[url(http://wpkixx.com/html/pitnik/images/resources/profile-image.jpg)]  bg-center ">
          <img
            src={user.image}
            alt=""
            className="rounded-full w-[75px] h-[75px] md:w-[100px] md:h-[100px] border-2 border-white "
          />
          <div>
            <p className="pl-3 text-md font-semibold flex items-center gap-x-2 text-white">
              {user.userName.replace(/\s+/g, "")}
              <GoVerified className="text-blue-400" />
            </p>
          </div>
        </div>
        <div className="mt-5 pb-5 flex items-center justify-center space-x-7 border-bottom">
          <p
            className={`py-2 px-8 text-sm  rounded-full font-semibold cursor-pointer ${videos}`}
            onClick={() => {
              setShowUserVideos(true);
            }}
          >
            Videos
          </p>
          <p
            className={`py-2 px-8 text-sm  rounded-full font-semibold cursor-pointer ${liked}`}
            onClick={() => {
              setShowUserVideos(false);
            }}
          >
            Liked
          </p>
        </div>
        <div className="mt-5 pl-5 flex flex-col space-y-5">
          {videosList.length ? (
            videosList.map((post, i) => <VideoCard post={post} key={i} />)
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
              icon={`${showUserVideos ? "userVideos" : "userLikedVideos"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};
export default Profile;
