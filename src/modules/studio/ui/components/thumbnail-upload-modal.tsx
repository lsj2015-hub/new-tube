import { trpc } from "@/trpc/client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";

interface ThumbnailUploadModalProps {
  videoId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ThumbnailUplaodModal = ({ 
  videoId,
  open,
  onOpenChange
}: ThumbnailUploadModalProps) => {
  const utils = trpc.useUtils()

  const onUploadComplete = () => {
    onOpenChange(false)
    utils.studio.getMany.invalidate()
    utils.studio.getOne.invalidate({ id: videoId })
  }

  return (
    <ResponsiveModal title="Upload a thumbnail" open={open} onOpenChange={onOpenChange}>
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveModal>
  )
};