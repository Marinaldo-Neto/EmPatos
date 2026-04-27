import Link from "next/link";

type CategoryCardProps = {
  icon: string;
  label: string;
  href: string;
};

export default function CategoryCard({
  icon,
  label,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <article
        className="
          flex
          flex-col
          bg-(--gray-bg)
          border-2
          border-(--border-color)
          rounded-lg
          text-(--secondary-text)
          text-sm
          font-semibold
          p-4
          gap-2
          cursor-pointer
        "
      >
        <i className={`bi ${icon} text-3xl`}></i>
        {label}
      </article>
    </Link>
  );
}