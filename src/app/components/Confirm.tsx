type ConfirmProps = {
  className?: string;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DecoratedConfirm({
  className,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 ${className}`}
    >
      <div className="w-[80%] max-w-sm p-6 bg-white rounded-2xl">
        <h2 className="mb-4 text-xl text-center">{title}</h2>
        <p className="mb-6 text-center text-red-500">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 transition-colors hover:text-main-yellow"
          >
            아니요
          </button>
          <button onClick={onConfirm} className="px-6 py-2 hover:text-red-600">
            예
          </button>
        </div>
      </div>
    </div>
  );
}
