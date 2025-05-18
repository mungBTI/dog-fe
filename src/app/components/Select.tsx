export default function DecoratedSelect({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={onChange}
      className="relative text-right transition-all duration-300 ease-in-out bg-transparent border-b-2 outline-none cursor-pointer w-fit border-b-transparent hover:border-main-yellow focus:border-main-yellow focus:outline-none focus:ring-0"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
