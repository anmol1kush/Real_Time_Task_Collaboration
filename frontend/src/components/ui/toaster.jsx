import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="dark"
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };