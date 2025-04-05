// src/lib/AlertComp.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type Props = {
  title: string;
  desc: string;
  variant: "default" | "destructive";
};

const AlertComp = ({ title, desc, variant }: Props) => {
  return (
    <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};

export default AlertComp;
