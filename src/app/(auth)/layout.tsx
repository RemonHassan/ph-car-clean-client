import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <h2>Authentication Related Page</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
