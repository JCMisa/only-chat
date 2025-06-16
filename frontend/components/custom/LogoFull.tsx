import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoFull = ({
  width = 20,
  height = 20,
  textSize = "sm",
}: {
  width?: number;
  height?: number;
  textSize?: string;
}) => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image
        src="/logo.svg"
        loading="lazy"
        blurDataURL="/blur.jpg"
        alt="logo"
        width={width}
        height={height}
      />
      <p className={`text-${textSize}`}>nlyChat</p>
    </Link>
  );
};

export default LogoFull;
