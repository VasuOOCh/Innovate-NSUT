import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const alertcomp = (title:string,desc:string,variant:string) => {
  return (
    variant === "destructive" ? (<Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {desc}
      </AlertDescription>
    </Alert>) : (
      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {desc}
        </AlertDescription>
      </Alert>
    )
  );
};

export default alertcomp;
