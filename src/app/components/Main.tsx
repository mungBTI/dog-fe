import { layout } from "@/styles/layout";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${layout.flex.list.full} justify-between`}>{children}</div>
  );
}
