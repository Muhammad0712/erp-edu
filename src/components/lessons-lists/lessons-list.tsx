import { Button } from "antd"
import { useRef, useState } from "react"
import type { LessonsType } from "@types"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import LessonInfoModal from "./lesson-info-modal";
import LessonItem from "./lesson-items";


export const LessonsList = ({ lessons }: { lessons: LessonsType[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [selectedLesson, setSelectedLesson] = useState<LessonsType | null>(null);
    
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft)
        }
    }

    const goNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 70, behavior: 'smooth' })
        }
    }

    const goPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -70, behavior: 'smooth' })
        }
    }

    const isStartDisabled = () => {
        if (!containerRef.current) return true
        return scrollPosition <= 5;
    }

    const isEndDisabled = () => {
        if (!containerRef.current) return true;
        const container = containerRef.current;
        return scrollPosition + container.clientWidth >= container.scrollWidth - 3;
    }

    return (
        <div className="flex gap-2 items-center mt-[20px] w-full h-full">
            <Button
                type="primary"
                disabled={isStartDisabled()}
                onClick={goPrev}
                style={{
                    width: '60px',
                    height: '60px'
                }}
            >
                <LeftOutlined />
            </Button>
            <div
                className="overflow-x-scroll flex gap-[10px] [&::-webkit-scrollbar]:hidden"
                ref={containerRef}
                onScroll={handleScroll}
                style={{
                    width: '100%', // Container uchun fixed width
                    height: '90px',
                    transition: '0.5s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                {lessons.map((lesson: LessonsType) => {
                    return <LessonItem key={lesson.id} setOpen={setOpen} lesson={lesson} setSelectedLesson={setSelectedLesson} />
                })}
                {open && <LessonInfoModal open={open} toggle={() => setOpen(false)} lesson={selectedLesson} />}
            </div>
            <Button
                type="primary"
                disabled={isEndDisabled()}
                onClick={goNext}
                style={{
                    width: '60px',
                    height: '60px'
                }}
            >
                <RightOutlined />
            </Button>
        </div>
    )
}

export default LessonsList