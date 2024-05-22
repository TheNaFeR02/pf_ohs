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
import { BundleEntry } from "@/types/Bundle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface RowDeleteAlertProps {
  id: string;
  resourceType: string;
  data: BundleEntry<any>[];
  setData: (data: BundleEntry<any>[]) => void;
  tableTitle: string;
  deleteFunction: (props: {
    resourceType: string;
    id: string;
    access_token: string | undefined;
  }) => Promise<any>;
}

function RowDeleteAlertDialog({
  id,
  resourceType,
  data,
  setData,
  tableTitle,
  deleteFunction,
}: RowDeleteAlertProps) {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  
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
                await deleteFunction({ resourceType, id , access_token: session?.user?.access_token });
                setData(data.filter((entry) => entry.resource.id !== id));
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
