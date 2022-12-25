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
const VideoCardProfile = ({ post }) => {
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    setDetail(post);
  }, [post]);
  return <div>{detail.caption}</div>;
};

export default VideoCardProfile;
