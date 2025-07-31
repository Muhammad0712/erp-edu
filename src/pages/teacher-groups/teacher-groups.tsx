import { useTeachers } from "@hooks"
const TeacherGroups = () => {
    const { data } = useTeachers()
    console.log(data)
    return (
        <div>
            <h1>TeacherGroups</h1>
        </div>
    )
}

export default TeacherGroups