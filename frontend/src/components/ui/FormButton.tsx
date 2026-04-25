type FormButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function FormButton({
  children,
  disabled = false,
  className = "",
}: FormButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
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
    </button>
  );
}