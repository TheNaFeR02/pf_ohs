import { deleteQuestionnaire } from "@/features/questionnaire_creator/server/deleteQuestionnaire";
import { BundleEntry } from "@/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
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

interface rowDeleteAlertProps {
  id: string;
  data: BundleEntry<Questionnaire>[];
  setData: (data: BundleEntry<Questionnaire>[]) => void;
  tableTitle: string;
}

function RowDeleteAlertDialog({ id, data, setData, tableTitle }: rowDeleteAlertProps) {
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
            onClick={() => {
              try {
                toast({
                  title: `${tableTitle} ${id} deleted`,
                  description: `The ${tableTitle.toLocaleLowerCase()} has been deleted`,
                  variant: "destructive",
                });
                setData(data.filter((entry) => entry.resource?.id !== id));
                deleteQuestionnaire(id);
              } catch (error) {
                console.error(error);
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
