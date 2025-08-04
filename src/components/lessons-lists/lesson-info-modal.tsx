import { CalendarOutlined, ExclamationCircleOutlined, SnippetsOutlined } from "@ant-design/icons"
import type { LessonsType, ModalProps } from "@types"
import { Modal } from "antd"

interface LessonProps extends ModalProps {
    lesson: LessonsType | null
}
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'completed':
            return <span className="w-[100px] h-[24px] flex items-center justify-center bg-[rgb(173,255,173)] border border-[green] rounded text-[green]">{status}</span>
        case 'cancelled':
            return <span className="w-[100px] h-[24px] flex items-center justify-center bg-[rgb(255,173,173)] border border-[red] rounded text-[red]">{status}</span>
        case 'in_progress':
            return <span className="w-[100px] h-[24px] flex items-center justify-center bg-[rgb(173,173,255)] border border-[blue] rounded text-[blue]">{status}</span>
        default:
            return <span className="w-[100px] h-[24px] flex items-center justify-center bg-[rgb(225,225,225)] border border-[gray] rounded text-[gray]">{status}</span>
    }
}


const LessonInfoModal = ({ open, toggle, lesson }: LessonProps) => {
    console.log(lesson?.roomId);
    return (
        <Modal
            open={open}
            onCancel={toggle}
            style={{ width: '300px', height: '400px' }}
            footer={null}
        >
            <h1 className="text-2xl text-center font-bold">{lesson!.title}</h1>
            <div className="w-full h-[140px] flex flex-col justify-around">
                <div className="w-full flex gap-3">
                    <div className="flex gap-2">
                        <CalendarOutlined />
                        <span className="font-bold">Start date: </span>
                    </div>
                    <p className="text-[rgb(131,131,131)]">{lesson!.date.split('T')[0]}</p>
                </div>
                <div className="w-full flex gap-3">
                    <div className="flex gap-2">
                        <SnippetsOutlined />
                        <span className="font-bold">Notes: </span>
                    </div>
                    <p className="text-[rgb(131,131,131)]">Notes: {lesson!.notes}</p>
                </div>
                <div className="w-full flex gap-3">
                    <div className="flex gap-2">
                        <ExclamationCircleOutlined />
                        <span className="font-bold">Status: </span>
                    </div>
                    <p>{lesson?.status && getStatusBadge(lesson.status)}</p>
                </div>
            </div>
        </Modal>
    )
}

export default LessonInfoModal