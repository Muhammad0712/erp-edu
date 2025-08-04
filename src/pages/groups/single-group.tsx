import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { Button, Card, Row, Table, Tooltip } from "antd";
import TeachersCollapse from "./teachers-collapse/teachers-collapse";
import {
  BookOutlined,
  CalendarOutlined,
  CommentOutlined,
  DeleteOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  HourglassOutlined,
} from "@ant-design/icons";

import { LessonsList, StudentsColumns } from "@components";
import { useState } from "react";
import type { StudentsType } from "@types";
import AddTeacherToGroupModal from "./modals/add-teacher-to-group-modal";

const SingleGroups = () => {
  const { id } = useParams();
  const { teachers, group, students } = useGroup(undefined, Number(id))
  const [openTacherModal, setOpenTacherModal] = useState(false);

  const course = group?.data?.group?.course
  const groupData = group?.data?.group

  const allStudents = students?.data.map((item: any) => ({
    id: item.id,
    first_name: item.student.first_name,
    last_name: item.student.last_name,
    email: item.student.email,
    phone: item.student.phone,
    date_of_birth: item.student.date_of_birth,
    status: item.status
  }))

  const lessonsLength = (lessons: any) => {
    let count = 0;
    lessons?.forEach(() => {
      count = count + 1;
    });
    return count;
  }


  const SeparationByStatus = (lessons: any, status: string) => {
    let count = 0;
    lessons?.forEach((lesson: any) => {
      if (lesson.status === status) {
        count = count + 1;
      }
    });
    return count;
  }

  const columns = [
    ...(StudentsColumns),
    {
      title: 'actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: StudentsType) => (
        <div>
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              danger
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ]

  return (
    <>
      <div className="flex justify-between">
        {/* Teachers card */}
        <Card
          style={{
            width: '70%',
            maxHeight: '550px',
            overflow: 'auto',
            paddingTop: '0px',
            padding: 0,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          <div
            style={{
              width: '100%',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              position: 'sticky',
              top: 0,
              zIndex: 100,
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <h1 style={{ marginBottom: '10px', fontSize: '32px', fontFamily: 'Poppins', }} >Teachers</h1>
            <Button type="primary" className="!bg-[green] hover:!bg-green-600" onClick={() => setOpenTacherModal(true)}> Add teacher</Button>
            {teachers && <AddTeacherToGroupModal open={openTacherModal} toggle={() => setOpenTacherModal(false)} teachers={teachers.data} />}
          </div>
          {teachers && <TeachersCollapse data={teachers?.data} />}
        </Card>


        {/* Course information */}
        <Card
          style={{
            width: '29%',
            height: '550px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Group information */}
          <div className="w-full h-[240px] flex flex-col gap-2 mt-[40px] text-[16px]">
            <div className="w-full flex items-center justify-center border-b-1 border-b-gray-400">
              <Tooltip title={groupData?.name} placement="left">
                <p className="text-3xl font-bold font-[Poppins]">{groupData?.name.length > 10 ? `${groupData?.name.slice(0, 10)}...` : groupData?.name}</p>
              </Tooltip>
            </div>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <CalendarOutlined />
                <span className=""> Start date:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{groupData?.start_date}</p>
            </div>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <CalendarOutlined />
                <span className=""> End date:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{groupData?.end_date}</p>
            </div>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <FieldTimeOutlined />
                <span className=""> Start time:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{groupData?.start_time}</p>
            </div>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <FieldTimeOutlined />
                <span className=""> End time:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{groupData?.end_time}</p>
            </div>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <BookOutlined />
                <span className=""> Lessons:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{lessonsLength(groupData?.lessons)}</p>
            </div>
          </div>
          {/* Course information */}
          <div className="w-full flex items-center justify-center gap-2">
            <span className="text-[20px] font-bold font-[Poppins]">{course?.title}</span>
          </div>

          <div className="flex flex-col justify-between w-full h-[170px] mt-[10px]">
            <div className="text-[16px] flex justify-between">
              <div className="flex gap-2">
                <CalendarOutlined />
                <span className="">Lessons per month: </span>
              </div>
              <p className="text-[rgb(131,131,131)]">{course?.lessons_in_a_month} times</p>
            </div>
            <div className="text-[16px] flex justify-between">
              <div className="flex gap-2">
                <CalendarOutlined />
                <span className="">Lessons per week:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{course?.lessons_in_a_week} times</p>
            </div>
            <div className="text-[16px] flex justify-between">
              <div className="flex gap-2">
                <HourglassOutlined />
                <span className="">Duration:</span>
              </div>
              <p className="text-[rgb(131,131,131)]">{course?.lesson_duration} minutes</p>
            </div>
            <div className="text-[16px] flex justify-between">
              <div className="flex gap-2">
                <DollarOutlined />
                <span className="">Price: </span>
              </div>
              <p className="text-[rgb(131,131,131)]">{course?.price} so'm</p>
            </div>
            <div className="text-[16px] flex justify-between">
              <div className="flex gap-2">
                <CommentOutlined />
                <span className="">Description: </span>
              </div>
              <Tooltip title={course?.description} placement="left">
                <p className="text-[rgb(131,131,131)]">{course?.description.length > 10 ? `${course?.description.slice(0, 10)}...` : course?.description}</p>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>

      {/* Lessons */}
      <Card
        style={{
          marginTop: '10px',
        }}
      >
        <Row
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #9ca3af',
            justifyContent: 'space-between'
          }}
        >
          <p className="text-[20px] font-serif">Lessons</p>
          <div className="w-[600px] h-[40px] flex items-center gap-2">
            <div className="w-[25%] h-[24px] flex items-center justify-center gap-1">
              <div className="w-[100px] h-[24px] bg-[rgb(173,255,173)] text-[green] flex items-center justify-center rounded-[15px]">
                <p className="text-[11px]">Completed</p>
              </div>
              <p className="text-[15px]">: {SeparationByStatus(groupData?.lessons, 'completed')}</p>
            </div>
            <div className="w-[25%] h-[24px] flex items-center justify-center gap-1">
              <div className="w-[100px] h-[24px] bg-[rgb(255,173,173)] text-[red] flex items-center justify-center rounded-[15px]">
                <p className="text-[11px]">Cancelled</p>
              </div>
              <p className="text-[15px]">: {SeparationByStatus(groupData?.lessons, 'cancelled')}</p>
            </div>
            <div className="w-[25%] h-[24px] flex items-center justify-center gap-1">
              <div className="w-[100px] h-[24px] bg-[rgb(173,173,255)] text-[blue] flex items-center justify-center rounded-[15px]">
                <p className="text-[11px]">In progress</p>
              </div>
              <p className="text-[15px]">: {SeparationByStatus(groupData?.lessons, 'in_progress')}</p>
            </div>
            <div className="w-[25%] h-[24px] flex items-center justify-center gap-1">
              <div className="w-[100px] h-[24px] bg-[rgb(225,225,225)] text-[gray] flex items-center justify-center rounded-[15px]">
                <p className="text-[11px]">new</p>
              </div>
              <p className="text-[15px]">: {SeparationByStatus(groupData?.lessons, 'new')}</p>
            </div>
          </div>
        </Row>
        <div className="h-[90px] w-full">
          <LessonsList lessons={groupData?.lessons || []} />
        </div>
      </Card>

      {/* Students */}
      <Card
        style={{
          marginTop: '10px',
          width: '100%',
          maxHeight: '500px'
        }}
      >
        <Row
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #9ca3af',
            justifyContent: 'space-between'
          }}
        >
          <p className="text-[20px] font-serif">Students</p>
          <Button type="primary" >Add student</Button>
        </Row>
        <div className="h-[400px] overflow-y-scroll w-full">
          <Table
            columns={columns}
            dataSource={allStudents}
            pagination={false}
            rowKey="id"
          />
        </div>

      </Card>
    </>
  )
}

export default SingleGroups