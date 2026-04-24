type PageIntroProps = {
  icon: string;
  title: string;
  description: string;
};

export default function PageIntro({
  icon,
  title,
  description,
}: PageIntroProps) {
  return (
    <>
      <div className="flex w-fit rounded-full bg-(--blue-bg) p-6 text-6xl text-(--primary-color)">
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="flex w-full flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-(--secondary-text)">
          {description}
        </p>
      </div>
    </>
  );
}