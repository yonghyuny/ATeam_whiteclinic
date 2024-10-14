import Image from 'next/image';
import Link from 'next/link';

export type ALogoIconProps = {
  href: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};
const ALogoIcon = ({ href, src, width, height, alt }: ALogoIconProps) => {
  return (
    <>
      <Link href={href}>
        <Image src={src} width={width} height={height} alt={alt}></Image>
      </Link>
    </>
  );
};

export default ALogoIcon;
