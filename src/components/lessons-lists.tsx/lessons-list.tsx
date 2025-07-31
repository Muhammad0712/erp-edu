import { Button } from "antd"
import { useRef } from "react"
import type { LessonsType } from "@types"

export const LessonsList = ({ lessons }: { lessons: LessonsType[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollPosition = 0
    const handleScroll = () => {

    }
    const goNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 50, behavior: 'smooth' })
        }
    }
    const goPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -50, behavior: 'smooth' })
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
        <div className="flex gap-2 items-center">
            <Button type="primary" disabled={isStartDisabled()} onClick={goPrev}>prev</Button>
            <div className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden" ref={containerRef} onScroll={handleScroll} style={{ scrollBehavior: 'smooth' }} id="lessons">
                {
                    lessons.map((lesson: LessonsType, index: number) => {
                        return <div key={lesson.id} className="p-2 bg-[#ccc] rounded-lg "><span>{index + 1}</span></div>
                    })
                }
            </div>
            <Button type="primary" disabled={isEndDisabled()} onClick={goNext}>next</Button>
        </div>
    )
}

export default LessonsList