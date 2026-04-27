type StepCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function StepCard({
  icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="flex flex-col w-full items-center">
      <span className="bg-(--primary-color) rounded-lg text-xl text-(--button-item) py-2 px-4 w-fit h-fit mb-4">
        <i className={`bi ${icon}`}></i>
      </span>

      <h6 className="font-bold text-xl">{title}</h6>

      <p className="text-(--secondary-text) text-sm max-w-80">
        {description}
      </p>
    </div>
  );
}