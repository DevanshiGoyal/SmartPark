import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    secondary: "bg-gray-700 text-gray-200",
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    destructive: "bg-red-500/20 text-red-400 border-red-500/30",
    premium:
      "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
