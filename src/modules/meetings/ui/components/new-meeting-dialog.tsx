import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingForm } from "./meeting-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Call a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm 
      onSuccess={(id) => {
        onOpenChange(false);
        router.push(`/meetings/${id}`);
      }}
      onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
