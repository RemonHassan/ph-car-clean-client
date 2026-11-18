import { Header } from "@/components/shared/Header";
import { Navbar } from "@/components/shared/Navbar";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
