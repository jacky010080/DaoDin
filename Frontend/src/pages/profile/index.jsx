import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/font.module.scss";
import { getServerCookie } from "../../utils/cookie";
import Group from "@/components/Group";
import Topbar from "@/components/Topbar";
import ProfilePicture from "@/components/ProfilePicture";
import myGroupsMockData from "@/data/myGroupsMockData";
import profileMockData from "@/data/profileMockData";

const apiUrl = process.env.API_URL;

export default function ProfilePage({ token, userId }) {
  const [profileData, setProfileData] = useState({});
  const [myGroups, setMyGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowMyGroups, setIsShowMyGroups] = useState(false);
  const router = useRouter();
  const path = router.pathname;

  const nameRef = useRef(null);
  const introRef = useRef(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = async () => {
    await axios
      .get(`${apiUrl}/user/profile?user_id=${userId}`, config)
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyGroups = async () => {
    await axios
      .get(`${apiUrl}/group/search?creator_id=1`, config)
      .then((res) => {
        setMyGroups(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getJoinedGroups = async () => {
    await axios
      .get(`${apiUrl}/group/search?isJoined=1`, config)
      .then((res) => {
        setJoinedGroups(res.data.groups);
        console.log(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleIsShowMyGroups = () => {
    setIsShowMyGroups(!isShowMyGroups);
  };

  useEffect(() => {
    getProfile();
    getMyGroups();
    getJoinedGroups();
  }, []);

  const putProfile = async (payload) => {
    await axios
      .put(`${apiUrl}/user/profile?user_id=${userId}`, payload, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = async () => {
    if (isEditing) {
      await putProfile({
        name: nameRef.current.value,
        self_intro: introRef.current.value,
      });
      await getProfile();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Topbar />
      <div className={`${styles.content} min-h-screen bg-backgroundColor p-12`}>
        <div className="group w-[90%] max-w-5xl flex gap-3 bg-white m-auto mb-7 px-12 py-8 rounded-[20px] flex relative">
          <ProfilePicture
            picture={profileData.picture}
            token={token}
            getProfile={getProfile}
          />
          {isEditing ? (
            <div className="w-full">
              <div className="flex justify-between items-center pr-2.5 mb-5">
                <textarea
                  name="name"
                  id="name"
                  rows="1"
                  className="px-2 text-3xl font-bold border border-solid border-primaryColor rounded-[20px] resize-none overflow-hidden"
                  defaultValue={profileData.name}
                  ref={nameRef}
                />
                <div className="flex gap-3">
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image src="/line.png" alt="Line" width={42} height={42} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image
                      src="/facebook.png"
                      alt="Facebook"
                      width={42}
                      height={42}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image
                      src="/instagram.png"
                      alt="Instagram"
                      width={42}
                      height={42}
                    />
                  </Link>
                </div>
              </div>
              <textarea
                name="self_intro"
                id="self_intro"
                rows="5"
                className="w-full p-2.5 text-lg font-normal border border-solid border-primaryColor rounded-[20px] resize-none overflow-hidden"
                defaultValue={profileData.self_intro}
                ref={introRef}
              />
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-between items-center px-2.5 mb-5">
                <p className={`${styles.content} text-3xl font-bold`}>
                  {profileData.name || profileMockData.name}
                </p>
                <div className="flex gap-3">
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image src="/line.png" alt="Line" width={42} height={42} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image
                      src="/facebook.png"
                      alt="Facebook"
                      width={42}
                      height={42}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                    target="_blank"
                  >
                    <Image
                      src="/instagram.png"
                      alt="Instagram"
                      width={42}
                      height={42}
                    />
                  </Link>
                </div>
              </div>
              <p
                className={`${styles.content} w-full px-6 py-4 min-h-[100px] text-xl bg-backgroundColor rounded-[20px]`}
              >
                {profileData.self_intro || profileMockData.self_intro}
              </p>
            </div>
          )}

          <button
            type="button"
            className="hidden group-hover:block absolute top-4 right-5"
            onClick={handleEdit}
          >
            <Image
              src="/edit.png"
              alt="edit"
              width={30}
              height={30}
              className="w-6 h-6 p-1 bg-primaryColor rounded-[3px]"
            />
          </button>
        </div>

        <div className="w-[90%] max-w-5xl m-auto">
          <div className="flex justify-between">
            <div className="flex">
              <button
                type="button"
                className={`${styles.content} h-16 ${
                  isShowMyGroups
                    ? "text-white bg-primaryColor"
                    : "text-primaryColor bg-white"
                }
                  text-[26px] font-bold px-6 rounded-t-[20px] flex items-center`}
                onClick={toggleIsShowMyGroups}
              >
                My Groups {isShowMyGroups}
              </button>
              <button
                type="button"
                className={`${styles.content} h-16 ${
                  isShowMyGroups
                    ? "text-primaryColor bg-white"
                    : "text-white bg-primaryColor"
                } text-[26px] font-bold px-6 rounded-t-[20px] flex items-center`}
                onClick={toggleIsShowMyGroups}
              >
                Joined Groups
              </button>
            </div>
            <Link
              href="/createGroup"
              className={`${styles.content} h-12 text-white text-[26px] font-bold bg-primaryColor px-6 rounded-[50px] flex items-center`}
            >
              Create
            </Link>
          </div>
          <div className="bg-white rounded-tr-[20px] rounded-b-[20px] px-12 pt-2 pb-8">
            {isShowMyGroups
              ? myGroups.map((myGroup) => (
                  <Group
                    path={path}
                    key={myGroup.group_id}
                    name={myGroup.name}
                    category={myGroup.category}
                    location={myGroup.location}
                    description={myGroup.description}
                    status={myGroup.status}
                  />
                ))
              : joinedGroups.map((joinedGroup) => (
                  <Group
                    path={path}
                    key={joinedGroup.group_id}
                    name={joinedGroup.name}
                    category={joinedGroup.category}
                    location={joinedGroup.location}
                    description={joinedGroup.description}
                    status={joinedGroup.status}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = getServerCookie("userInfo", "token", context.req);
  const userId = getServerCookie("userInfo", "user_id", context.req);
  const name = getServerCookie("userInfo", "name", context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, userId, name },
  };
}
