import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="h-full w-full bg-[#fff]">{children}</div>;
}

export default Wrapper;
