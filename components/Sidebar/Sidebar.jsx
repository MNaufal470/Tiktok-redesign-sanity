import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { topics } from "../../utils/constants";
const Sidebar = () => {
  const router = useRouter();
  const { topic } = router.query;
  const activeTopic = "bg-[#6462fd] text-white";
  const topicStyle = "bg-[#edf2f6] text-[#535165]";
  return (
    <div className="md:w-[70px]  bg-white sidebar w-full pb-4 md:pb-0 md:sticky md:top-[0px] relative z-50">
      <div className="flex md:flex-col items-center justify-center mt-5 md:mt-10 gap-y-10 gap-x-3 md:bg-white">
        {topics.map((item) => (
          <Link
            href={topic === item.name ? "/" : `/?topic=${item.name}`}
            key={item.name}
          >
            <span
              className={`${
                topic === item.name ? activeTopic : topicStyle
              }  md:p-3 p-2 flex space-x-9 items-center rounded-full text-lg cursor-pointer hover:bg-[#6462fd] hover:text-white customHover`}
            >
              {item.icon}
              <p className="!hidden md:hidden  absolute capitalize text-xs  p-3  bg-black/80 w-[70px] text-white text-center rounded-full">
                {item?.name}
              </p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
