import { toast } from "./ui/use-toast";

interface ConfirmationToastProps {
  resourceType: string;
  operation: string;
}

const ConfirmationToast = ({
  resourceType,
  operation,
}: ConfirmationToastProps) => {
  return toast({
    title: `${resourceType} ${operation}`,
    description: `The ${resourceType.toLowerCase()} has been ${operation}`,
    variant: "default",
  });
};

export default ConfirmationToast;
