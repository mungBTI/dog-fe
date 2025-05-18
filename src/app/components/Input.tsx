export default function DecoratedInput({
  type,
  value,
  onChange,
  label,
}: {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  return (
    <input
      aria-label={label}
      type={type}
      value={value}
      onChange={onChange}
      className="relative text-right transition-all duration-300 ease-in-out bg-transparent border-0 border-b-2 outline-none cursor-pointer w-fit border-b-transparent hover:border-main-yellow focus:border-main-yellow focus:outline-none focus:ring-0"
    />
  );
}
