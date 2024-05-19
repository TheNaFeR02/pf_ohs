import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { BundleEntry } from "@/types/Bundle";

interface RowDeleteAlertProps {
  id: string;
  resourceType: string;
  data: BundleEntry<any>[];
  setData: (data: BundleEntry<any>[]) => void;
  tableTitle: string;
  deleteFunction: (props: { resourceType: string, id: string }) => Promise<any>;
}

function RowDeleteAlertDialog({
  id,
  resourceType,
  data,
  setData,
  tableTitle,
  deleteFunction,
}: RowDeleteAlertProps) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                await deleteFunction({ resourceType, id });
                setData(data.filter((entry) => entry.resource.id !== id));
                toast({
                  title: `${tableTitle} ${id} deleted`,
                  description: `The ${tableTitle.toLowerCase()} has been deleted`,
                  variant: "destructive",
                });
              } catch (error) {
                console.error(error);
                toast({
                  title: "Error",
                  description: `Failed to delete ${tableTitle.toLowerCase()} ${id}`,
                  variant: "destructive",
                });
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RowDeleteAlertDialog;
