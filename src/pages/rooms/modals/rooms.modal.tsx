import type { ModalProps, RoomsType } from "@types"

interface RoomsProps extends ModalProps {
    update: RoomsType | null;
}
const RoomsModal = ({ open, toggle, update }: RoomsProps) => {
    console.log("RoomsModal", open, toggle, update);
  return (
    <div>RoomsModal</div>
  )
}

export default RoomsModal