import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Suggest from "../components/Suggest/Suggest";
import { useRouter } from "next/router";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSr] = useState(true);
  useEffect(() => {
    setIsSSr(false);
  }, []);
  if (isSSR) return null;
  const router = useRouter();
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className={`md:bg-[#fa6342] h-screen overflow-y-hidden bg-white  `}>
        <div
          className={`xl:w-[1200px] m-auto   bg-[#edf2f6] ${
            router.asPath === "/upload" ? "overflow-hidden" : ""
          }`}
        >
          <Navbar />
          <div className="flex  h-screen overflow-y-scroll scrollbar-hide flex-col md:flex-row  md:gap-5 lg:gap-10">
            {router.asPath == "/upload" ? "" : <Sidebar />}
            {router.asPath == "/upload" ? "" : <Suggest />}
            <div
              className={`${router.asPath === "/upload" ? "flex-1" : ""} \ `}
            >
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
