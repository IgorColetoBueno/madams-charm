import { ReactNode } from "react";

interface IMainProps {
  children: ReactNode | ReactNode[];
}

const Main = ({ children }: IMainProps) => {
  return (
    <main className="max-w-screen-xl mx-auto my-5 space-y-5 px-5">
      {children}
    </main>
  );
};

export default Main;
