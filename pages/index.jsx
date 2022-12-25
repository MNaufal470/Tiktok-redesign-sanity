import Head from "next/head";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { BASE_URL } from "../utils";
import VideoCard from "../components/VideoCard/VideoCard";
import NoResults from "../components/NoResults/NoResults";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = ({ videos }) => {
  const { userProfile } = useAuthStore();
  const router = useRouter();
  const { topic } = router.query;
  return (
    <div className="">
      <Head>
        <title>Tiktok Redesign | 2022</title>
        <link rel="icon" href="https://wpkixx.com/html/pitnik/images/fav.png" />
      </Head>
      <div className="mt-10 md:w-[370px] lg:w-[600px] px-5 md:px-0">
        {userProfile ? (
          <div className="w-full h-[200px] bg-white rounded-lg  ">
            <p className="titleProfile p-4">Upload Video</p>
            <div className="p-4">
              <div className="flex items-center gap-x-2 pb-4">
                <img
                  src={userProfile.image}
                  alt=""
                  className="rounded-full border-2  hidden md:inline-block w-[50px] h-[50px] object-cover"
                />
                <p className="text-sm text-[#757a95]">
                  Share some what you are thinking ?
                </p>
              </div>
              <div className="mt-3 w-full ">
                <Link href={`/upload`}>
                  <button className="bg-[#23d2e2] w-full py-2 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-x-1 hover:bg-[#fa6342] transition-all ease-in-out duration-200">
                    Upload
                    <FaUpload className="text-sm" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mt-10 w-full flex flex-col gap-y-10 pb-20">
          {videos.length ? (
            videos?.map((video, i) => <VideoCard post={video} key={i} />)
          ) : (
            <div className=" md:w-[370px] lg:w-[600px] py-5 md:px-0  min-h-screen  rounded-lg bg-white ">
              <NoResults
                text={`No videos for  ${topic} topic`}
                icon="userVideos"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ query: { topic } }) => {
  let response = await axios.get(`${BASE_URL}/api/post`);
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/userLike/${topic}`);
    // } else if (topic) {
    //   response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    // }
  }
  return {
    props: { videos: response.data },
  };
};
export default Home;
