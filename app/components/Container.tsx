import { Typography, Divider } from "@mui/material";

const Container = ({ children, title }: any) => {
  return (
    <main className="h-screen text-white bg-slate-700 flex flex-col items-center gap-8">
      <Typography variant="h2">{title}</Typography>
      <Divider
        component="div"
        role="presentation"
        sx={{ borderColor: "white", width: "100%" }}
      />
      <div className="flex flex-row justify-center w-full">{children}</div>
    </main>
  );
};

export default Container;
