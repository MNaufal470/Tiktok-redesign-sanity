import React, { useEffect, useRef, useState } from "react";
import { GoVerified } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsPlayCircleFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import LikeButton from "../LikeButton/LikeButton";
import Comments from "../Comments/Comments";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { FaCommentDots } from "react-icons/fa";
import Link from "next/link";
const VideoCard = ({ post }) => {
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState({
    boolean: false,
    action: "",
  });
  const { userProfile } = useAuthStore();
  const videoRef = useRef();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    setDetail(post);
  }, [post]);
  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, detail, isVideoMuted]);
  const handleLike = async (like) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: detail._id,
        like,
      });
      setDetail({ ...detail, likes: data.likes });
    }
  };
  const handleComment = async (e, action, _key) => {
    e.preventDefault();
    if (userProfile) {
      setIsPostingComment({
        boolean: true,
        action: action ? "comment" : "delete",
      });
      const { data } = await axios.put(`${BASE_URL}/api/post/${detail._id}`, {
        userId: userProfile._id,
        comment,
        action,
        _key,
      });
      setDetail({ ...detail, comments: data.comments });
      setComment("");
      setIsPostingComment({ boolean: false, action: "" });
    }
  };
  return (
    <div className="flex flex-col space-y-10 h-full ">
      <div className="p-4 pr-5 bg-white rounded-lg">
        {/* PROFILE */}
        <Link href={`/profile/${detail?.userId}`}>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-x-3">
              <img
                src={detail?.postedBy?.image}
                alt=""
                className="rounded-full w-[50px] h-[50px] object-cover"
              />
              <div>
                <p className="text-[#fa6342] font-semibold text-sm flex gap-x-1 items-center">
                  {detail?.postedBy?.userName.replace(/\s+/g, "")}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {detail?.postedBy?.userName}
                </p>
              </div>
            </div>
            <div>
              <FiMoreHorizontal className="text-xl text-[#535165]" />
            </div>
          </div>
        </Link>
        {/* Post */}
        <div className="mt-5">
          <div>
            <p className="text-sm">{detail.caption}</p>
            <div className="mt-3 ">
              <div className="relative">
                <video
                  loop
                  src={detail?.video?.asset?.url}
                  className="w-full rounded-2xl cursor-pointer min-h-[320px] bg-black"
                  ref={videoRef}
                  onClick={onVideoClick}
                ></video>
                <div className="middleAbsolute ">
                  {!playing && (
                    <button onClick={onVideoClick}>
                      <BsPlayCircleFill className="text-[#fa6342]/80 text-6xl lg:text-8xl hover:text-[#fa6342]/100 hover:scale-125 transition-all ease-in-out duration-300" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-5 border-top px-4 w-full ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <LikeButton
                      detail={detail}
                      userProfile={userProfile}
                      handleLike={() => handleLike(true)}
                      handleDislike={() => handleLike(false)}
                      likes={detail.likes}
                    />
                    <div
                      className="relative"
                      onClick={() => setShowComments(!showComments)}
                    >
                      <span
                        className={`${
                          showComments ? "text-[#fa6342]" : "text-[#333]"
                        } flex items-end gap-x-0.5 cursor-pointer  hover:scale-110 hover:text-[#fa6342]`}
                        onClick={() => setShowComments(!showComments)}
                      >
                        <FaCommentDots className="text-xl" />
                        <small className="text-[10px]">
                          {detail?.comments?.length || 0}
                        </small>
                      </span>
                    </div>
                  </div>
                  <div>
                    {isVideoMuted ? (
                      <HiVolumeOff
                        className="cursor-pointer text-[#333] text-xl hover:text-[#fa6342]"
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                      />
                    ) : (
                      <HiVolumeUp
                        className="cursor-pointer text-[#333] text-xl hover:text-[#fa6342]"
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="trans">
                <Comments
                  showComments={showComments}
                  comment={comment}
                  comments={detail.comments}
                  setComment={setComment}
                  handleComment={handleComment}
                  isPostingComment={isPostingComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
