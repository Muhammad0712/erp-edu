import type { GroupTeachersType, ModalProps, StudentsType, TeachersType } from "@types"
import { Avatar, Modal, Button, DatePicker, message } from "antd";
import { useParams } from "react-router-dom";
import { useGroup, useTeachers } from "@hooks";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

interface AddTeacherToGroupModalProps extends ModalProps {
    students: StudentsType[];
}

const AddStudentToGroupModal = ({ open, toggle, students }: AddTeacherToGroupModalProps) => {
    const groupId = useParams().id;
    const { data } = useTeachers({page: 1, limit: 100});
    const { useGroupTeacherCreate } = useGroup({page: 1, limit: 100}, Number(groupId));
    const { mutate: addGroupTeacher, isPending: isLoading } = useGroupTeacherCreate();
    const [selectedTeacherIds, setSelectedTeacherIds] = useState<number[]>([]);
    const [startDate, setStartDate] = useState<string>('');

    const allStudents = data?.data;
    console.log(allStudents, 'allStudents');

    const selectedStudents = useMemo(() => {
        if (!allStudents || !students) return [];
        const GroupStudents = students.map((teacher: any) => teacher.id);
        return allStudents.data.filter((teacher: any) =>
            !GroupStudents.includes(teacher.id)
        );
    }, [allStudents, students]);

    const handleTeacherSelect = (teacherId: number) => {
        setSelectedTeacherIds(prev => {
            if (prev.includes(teacherId)) {
                return prev.filter(id => id !== teacherId);
            } else {
                return [...prev, teacherId];
            }
        });
    };

    // Backend ga ma'lumot yuborish
    const handleSubmit = () => {
        if (selectedTeacherIds.length === 0) {
            message.warning('Please select at least one teacher!');
            return;
        }   

        if (!groupId) {
            message.error('Group ID not found!');
            return;
        }

        const payload = {
            groupId: Number(groupId),
            teacherId: selectedTeacherIds,
            status: true,
            start_date: dayjs(startDate).format("YYYY-MM-DD") 
        } as GroupTeachersType;

        addGroupTeacher(payload, {
            onSuccess: () => {
                setSelectedTeacherIds([]);
                toggle();
            }
        });
    };

    const handleCancel = () => {
        setSelectedTeacherIds([]);
        toggle();
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            width={650}
            title="Add a teacher to this group" 
            maskClosable={false}
            keyboard={false}
            style={{
                top: 50
            }}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={isLoading}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    loading={isLoading}
                    disabled={selectedTeacherIds.length === 0}
                >
                    Add ({selectedTeacherIds.length})
                </Button>
            ]}
        >
            {/* Start Date tanlash */}
            <div className="mb-4 p-3 bg-gray-50 rounded">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date: 
                </label>
                <DatePicker
                    value={startDate || null}
                    onChange={(date: string) => setStartDate(date)}
                    format="YYYY-MM-DD"
                    className="w-full"
                    placeholder="Select start date"
                    
                />
            </div>

            {/* Teacherlar ro'yxati */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Teachers:
                </h3>
                <div className="w-full h-[270px] overflow-y-auto border border-gray-300 bg-white">
                    {selectedStudents && selectedStudents.length > 0 ? (
                        selectedStudents.map((teacher: any) => {
                            const isSelected = selectedTeacherIds.includes(teacher.id);

                            return (
                                <div
                                    key={teacher.id}
                                    className={`w-full min-h-[60px] flex items-center transition-all justify-between cursor-pointer border-b border-gray-200 last:border-b-0 ${isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => handleTeacherSelect(teacher.id)}
                                >
                                    <div className="flex items-center gap-3 py-3 px-4 flex-1">
                                        <Avatar
                                            size={40}
                                            src={teacher.avatar_url || undefined}
                                            className="flex-shrink-0"
                                        >
                                            {!teacher.avatar_url && (teacher.first_name?.[0] || 'T')}
                                        </Avatar>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {teacher.first_name} {teacher.last_name}
                                                </span>
                                            </div>
                                            {teacher.email && (
                                                <span className="text-xs text-gray-500 truncate">
                                                    {teacher.email}
                                                </span>
                                            )}
                                            {teacher.phone && (
                                                <span className="text-xs text-gray-500">
                                                    {teacher.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="pr-4">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}>
                                            {isSelected && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                            <div className="text-center">
                                <p>Qo'shish uchun teacherlar mavjud emas</p>
                                <p className="text-sm">Barcha teacherlar allaqachon guruhga qo'shilgan</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tanlangan teacherlar haqida ma'lumot */}
            {selectedTeacherIds.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-blue-800">
                                {selectedTeacherIds.length} ta teacher tanlandi
                            </span>
                        </div>
                        <button
                            onClick={() => setSelectedTeacherIds([])}
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default AddStudentToGroupModal;