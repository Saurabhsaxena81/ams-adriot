import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = ({ className = "w-6 h-6" }) => (
  <Loader2 className={`animate-spin ${className}`} />
);

export default Spinner;
