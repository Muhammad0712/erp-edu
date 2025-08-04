import { Tooltip } from "antd";
import type { LessonsType } from "@types";
type StatusType = 'completed' | 'cancelled' | 'in_progress' | 'new';
interface LessonItemProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    lesson: LessonsType,
    setSelectedLesson: React.Dispatch<React.SetStateAction<LessonsType | null>>
}



const statusConfig: Record<StatusType, {
    bgColor: string;
    borderColor: string;
    dotColor: string;
    textColor: string;
    bottomTextColor: string;
}> = {
    completed: {
        bgColor: 'bg-[rgb(173,255,173)]',
        borderColor: 'border-[green]',
        dotColor: 'bg-[green]',
        textColor: 'text-green-700',
        bottomTextColor: 'text-green-800'
    },
    cancelled: {
        bgColor: 'bg-[rgb(255,173,173)]',
        borderColor: 'border-[red]',
        dotColor: 'bg-[red]',
        textColor: 'text-red-700',
        bottomTextColor: 'text-red-800'
    },
    in_progress: {
        bgColor: 'bg-[rgb(173,173,255)]',
        borderColor: 'border-[blue]',
        dotColor: 'bg-[blue]',
        textColor: 'text-blue-700',
        bottomTextColor: 'text-blue-800'
    },
    new: {
        bgColor: 'bg-[rgb(225,225,225)]',
        borderColor: 'border-[gray]',
        dotColor: 'bg-gray-400',
        textColor: 'text-gray-700',
        bottomTextColor: 'text-gray-800'
    }
};

const getStatusConfig = (status: string) => {
    const validStatuses: StatusType[] = ['completed', 'cancelled', 'in_progress', 'new'];
    return statusConfig[validStatuses.includes(status as StatusType) ? status as StatusType : 'new'];
};

const LessonItem = ({setOpen, lesson, setSelectedLesson }: LessonItemProps) => {
    const date = lesson.date.split('T')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    const config = getStatusConfig(lesson.status);
    const shouldShowTooltip = ['completed', 'cancelled', 'new'].includes(lesson.status);

    const lessonContent = (
        <div
            key={lesson.id}
            onClick={() => {
                setSelectedLesson(lesson);
                setOpen(true);
            }}
            className={`w-[60px] h-[60px] ${config.bgColor} ${config.borderColor} rounded-lg
                flex-shrink-0 flex flex-col items-center justify-center relative transition-all
                hover:transform hover:translate-y-[-5px] cursor-pointer`}
        >
            <span className={`absolute top-1 right-1 w-[10px] h-[10px] ${config.dotColor} rounded-full`}></span>
            <span className={`${config.textColor} text-[20px]`}>{day}</span>
            <span className={`absolute bottom-[2px] text-[12px] ${config.bottomTextColor}`}>{month}</span>
        </div>
    );

    return shouldShowTooltip ? (
        <Tooltip title={lesson.title}>
            {lessonContent}
        </Tooltip>
    ) : lessonContent;
};

export default LessonItem