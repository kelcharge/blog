import { Divider } from "@mui/material";

// Colors are tailwind so they must have a weight
const Container = ({ children, bgColor, textColor }: any) => {
  return (
    <main
      className={`h-screen text-${textColor} bg-${bgColor} flex flex-col items-center gap-8`}
    >
      <Divider component="div" role="presentation" />
      <div className="flex lg:flex-row flex-col justify-center w-full">
        {children}
      </div>
    </main>
  );
};

export default Container;
