import Link from "next/link";

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export default function SecondaryButton({
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
        bg-(--component-bg)
        border-2
        border-(--border-color)
        rounded-lg
        text-center
        text-(--secondary-color)
        font-semibold
        active:brightness-90
        ${className}
        `}
    >
      {children}
    </Link>
  );
}