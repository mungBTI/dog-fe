import FlexListFull from "./Flex";

export default function Main({ children }: { children: React.ReactNode }) {
  return <FlexListFull className="justify-between">{children}</FlexListFull>;
}
