"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ShowDetails({ index }: { index: number }) {
  const [showDetails, setShowDetails] = useState([false, false, false]);
  return (
    <div>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 border-b border-transparent pb-2 focus:outline-none"
        onClick={() =>
          setShowDetails((prev) =>
            prev.map((item, i) => (i === index ? !item : item)),
          )
        }
      >
        <p className="text-md text-white">Show Chapter Details</p>
        <Image
          src={
            showDetails[index]
              ? "/icons/arrow_up_icon.png"
              : "/icons/arrow_down_icon.png"
          }
          alt="icon"
          width={24}
          height={24}
        />
      </button>
      {showDetails[index] && (
        <div className="mt-4 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/activity_icon.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p>Activity 1</p>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/activity_icon.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p>Activity 2</p>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/activity_icon.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p>Activity 3</p>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icons/assessment_icon.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p>Assessment</p>
          </Link>
        </div>
      )}
    </div>
  );
}
