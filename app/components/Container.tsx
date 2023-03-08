import { Typography, Divider } from "@mui/material";

const Container = ({ children, title }: any) => {
  return (
    <main className="h-screen text-white bg-slate-700 flex flex-col items-center gap-8">
      <h2 className="text-5xl pt-2 lg:pt-0 lg:text-7xl">{title}</h2>
      <Divider
        component="div"
        role="presentation"
        sx={{ borderColor: "white", width: "100%" }}
      />
      <div className="flex lg:flex-row flex-col justify-center w-full">
        {children}
      </div>
    </main>
  );
};

export default Container;
