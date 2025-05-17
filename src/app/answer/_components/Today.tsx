import { Name } from "@/types/answer";

export default function Today({ name }: Name) {
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-start p-2 mt-5 mb-1 text-xl">
        <p>today {name}</p>
        <div>😙</div>
      </div>
      <div className="flex flex-col items-start justify-start gap-1 w-full my-3"></div>
    </div>
  );
}
