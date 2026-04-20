import Link from "next/link";

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function PrimaryButton({
  children,
  href,
  className="",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`
        w-full 
        h-fit  
        cursor-pointer 
        bg-(--primary-color) 
        rounded-lg
        text-center 
        text-(--button-item) 
        font-bold 
        text-base
        active:grayscale-25
        ${className}
        `}
    >
      {children}
    </Link>
  );
}