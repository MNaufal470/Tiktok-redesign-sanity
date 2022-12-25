import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import NoResults from "../NoResults/NoResults";
import { BsTrash } from "react-icons/bs";
const Comments = ({
  showComments,
  isPostingComment,
  comment,
  setComment,
  comments,
  handleComment,
}) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div
      className={`transition-all ease-in duration-[400ms] ${
        !showComments
          ? "opacity-0 !h-0 hidden"
          : "mt-5 flex flex-col space-y-3 rounded-lg  w-full p-4"
      }  `}
    >
      <div className="h-[250px] scrollbar-hide md:scrollbar-default overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {comments?.length > 0 ? (
          comments?.map((item, i) => (
            <>
              {allUsers.map(
                (user) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="py-4 border-bottom" key={i}>
                      <div className="flex items-center gap-x-3 justify-between">
                        <div className="flex items-center gap-x-3">
                          <img
                            src={user.image}
                            alt=""
                            className="rounded-full w-[24px] h-[24x] md:w-[36px] md:h-[36x] object-cover"
                          />
                          <p className="text-[#fa6342] font-semibold text-xs md:text-sm flex gap-x-1 items-center">
                            {user.userName.replace(/\s+/g, "")}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                        {userProfile?._id === user._id && (
                          <span
                            className="pr-10"
                            onClick={(e) => handleComment(e, false, item._key)}
                          >
                            <BsTrash className="text-lg text-gray-400 cursor-pointer" />
                          </span>
                        )}
                      </div>
                      <div className="pl-[35px] md:pl-[50px] pr-5 ">
                        <p className="text-xs md:text-sm text-gray-400 font-[400]">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults
            text="No Comments yet! be the one to add a comment"
            icon="comment"
          />
        )}
      </div>
      <div className="  ">
        <div className="flex-1">
          {userProfile ? (
            <form
              action={(e) => handleComment(e, true)}
              className="flex items-center"
            >
              <input
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="w-full  bg-[#f8f8f8] md:p-4 p-3 md:text-sm text-xs outline-none rounded-tl-lg rounded-bl-lg "
                placeholder="Post your comment "
              />
              <div>
                <button
                  className="md:p-4 p-3 rounded-tr-lg rounded-br-lg font-semibold text-white  md:text-sm text-xs bg-[#fa6342] w-full"
                  onClick={(e) => handleComment(e, true)}
                >
                  {isPostingComment.boolean
                    ? isPostingComment.action === "comment"
                      ? "Commenting..."
                      : "Deleting..."
                    : "Comment"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center text-sm w-full bg-gray-100 py-3">
              Sign in to comment this video
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
