import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/font.module.scss";
import Group from "@/components/Group";
import Topbar from "@/components/Topbar";
import myGroupsMockData from "@/data/groupsMockData";
import profileMockData from "@/data/profileMockData";

export default function Home() {
  const router = useRouter();
  const path = router.pathname;

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
      <div className="min-h-screen bg-backgroundColor p-14">
        <div className="w-[90%] max-w-6xl bg-white m-auto mb-10 px-16 py-12 rounded-[20px] flex ">
          <Image
            src={`${profileMockData.picture}`}
            alt="avatar"
            className="w-36 h-36 rounded-full mr-11 shrink-0"
            width={200}
            height={200}
          />
          <div className="w-full">
            <div className="flex justify-between items-center px-2.5 mb-6">
              <p className={`${styles.content} text-3xl font-medium`}>
                {profileMockData.name}
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image src="/line.png" alt="Line" width={50} height={50} />
                </Link>
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/chouchouler?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
            </div>
            <p className="w-full px-5 py-3 min-h-[100px] text-xl bg-backgroundColor rounded-[20px]">
              {profileMockData.self_intro}
            </p>
          </div>
        </div>

        <div className="w-[90%] max-w-6xl m-auto">
          <div className="flex justify-between">
            <div
              className={`${styles.content} h-20 text-white text-[28px] font-bold bg-primaryColor px-10 rounded-t-[20px] flex items-center`}
            >
              My Groups
            </div>
            <div
              className={`${styles.content} h-14 text-white text-[28px] font-bold bg-primaryColor px-10 rounded-[50px] flex items-center`}
            >
              Create
            </div>
          </div>
          <div className="bg-white rounded-tr-[20px] rounded-b-[20px] px-16 pt-8 pb-16">
            {myGroupsMockData.map((myGroup) => (
              <Group
                path={path}
                key={myGroup.id}
                name={myGroup.name}
                category={myGroup.category}
                location={myGroup.location}
                description={myGroup.description}
                status={myGroup.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
