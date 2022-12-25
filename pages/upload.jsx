import Head from "next/head";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { topics } from "../utils/constants";
import { client } from "../utils/client";
import { MdDelete } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import { useRouter } from "next/router";

const upload = () => {
  const [videoAsset, setVideoAsset] = useState();
  const { userProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter();
  const uploadVideo = async (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const doc = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);

      router.push("/");
    }
  };
  return (
    <div className="">
      <Head>
        <title>Upload Video | 2022</title>
        <link rel="icon" href="https://wpkixx.com/html/pitnik/images/fav.png" />
      </Head>
      <div className="flex items-center justify-center w-full h-screen py-20 px-5 md:px-0">
        <div className="w-[800px] min-h-[500px]  bg-white rounded-lg p-4">
          <div>
            <div className="text-center pb-3 border-bottom">
              <p className="text-2xl text-[#fa6342] font-bold ">Upload Video</p>
              <p className="text-md text-gray-400 mt-1">
                Post a video to your account
              </p>
            </div>
            <div className="flex md:flex-row flex-col   items-center justify-center gap-x-10  gap-y-8 h-full w-full">
              <div
                className={`border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] ${
                  videoAsset ? "p-2" : "p-10"
                }  cursor-pointer hover:border-[#fa6342] hover:bg-gray-100`}
              >
                {!videoAsset ? (
                  loading || wrongFileType ? (
                    <div className="flex flex-col space-y-3 justify-center items-center">
                      {loading && (
                        <>
                          <img
                            src="https://cathydoll.co.id/assets/frontend/images/gif/lg.ring-loading-gif.gif"
                            alt=""
                          />
                          <p className="text-md font-semibold italic">
                            Uploading...
                          </p>
                        </>
                      )}
                      {wrongFileType && (
                        <label className="cursor-pointer w-full h-full text-center">
                          <IoIosWarning className="text-[6.5rem] text-yellow-400 m-auto" />
                          <p className="text-md font-semibold italic ">
                            Please select video type
                          </p>
                          <p className="bg-[#23d2e2] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none hover:bg-[#fa6342] transition-all ease-in-out duration-200">
                            Select file
                          </p>
                          <input
                            type="file"
                            name="upload-video"
                            onChange={uploadVideo}
                            className="w-0 h-0"
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="text-xl font-semibold text-center">
                            Select video to upload
                          </p>
                        </div>

                        <p className="bg-[#23d2e2] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none hover:bg-[#fa6342] transition-all ease-in-out duration-200">
                          Select file
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        onChange={uploadVideo}
                        className="w-0 h-0"
                      />
                    </label>
                  )
                ) : (
                  <div className=" rounded-3xl w-[250px]   flex flex-col gap-6 justify-center items-center">
                    <video
                      className="rounded-xl h-[300px] bg-black"
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col  gap-3 ">
                <label className="text-md font-medium ">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
                />
                <label className="text-md font-medium ">Choose a topic</label>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                >
                  {topics.map((item) => (
                    <option
                      key={item.name}
                      className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>

                <div className="flex gap-6 mt-10">
                  <button
                    onClick={() => {
                      setVideoAsset(undefined);
                    }}
                    type="button"
                    className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Discard
                  </button>
                  <button
                    disabled={videoAsset?.url ? false : true}
                    onClick={handlePost}
                    type="button"
                    className="bg-[#fa6342] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upload;
