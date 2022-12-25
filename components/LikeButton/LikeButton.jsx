import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";

const LikeButton = ({
  detail,
  userProfile,
  handleLike,
  handleDislike,
  likes,
}) => {
  let filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  return (
    <div>
      <span className="flex items-end gap-x-0.5 cursor-pointer text-[#333] hover:scale-110 hover:text-[#fa6342]">
        {alreadyLiked ? (
          <MdFavorite
            className="text-xl text-[#fa6342]"
            onClick={handleDislike}
          />
        ) : (
          <MdFavorite className="text-xl" onClick={handleLike} />
        )}
        <small className="text-[10px]">{detail?.likes?.length || 0}</small>
      </span>
    </div>
  );
};

export default LikeButton;
