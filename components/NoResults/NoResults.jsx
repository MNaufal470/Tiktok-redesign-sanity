import React from "react";
import { FaCommentSlash } from "react-icons/fa";
import { MdOutlineNoAccounts, MdOutlineVideocamOff } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";

const NoResults = ({ text, icon }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {icon === "comment" && (
        <p className="text-8xl">
          <FaCommentSlash />
        </p>
      )}
      {icon === "userVideos" && (
        <p className="text-8xl">
          <MdOutlineVideocamOff />
        </p>
      )}
      {icon === "userLikedVideos" && (
        <p className="text-8xl">
          <IoMdHeartDislike />
        </p>
      )}
      {icon === "account" && (
        <p className="text-8xl">
          <MdOutlineNoAccounts />
        </p>
      )}

      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
