import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card shadow-sm", className)}
    {...props}
  />
));

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0 flex", className)} {...props} />
);

export { Card, CardHeader, CardContent, CardFooter };