import React, { useState, useMemo } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Tooltip,
  Progress,
  Descriptions,
  Avatar,
  Typography,
  Spin
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useGroup } from '@hooks';
import { useParams } from 'react-router-dom';
import type { LessonsType } from '@types';

const { Title, Text } = Typography;
const { Option } = Select;

const SingleGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { id } = useParams();
  const { students, group, teachers } = useGroup({ page: 1, limit: 10 }, Number(id));

  // Extract real data from hooks
  const groupData = group?.data?.group;
  const studentData = students?.data?.student;
  const teacherData = teachers?.data?.teacher;
  const lessons = groupData?.lessons || [];

  // Calculate statistics from real data
  const stats = useMemo(() => {
    if (!lessons.length) return {
      total: 0,
      completed: 0,
      inProgress: 0,
      upcoming: 0,
      cancelled: 0,
      progress: 0
    };

    const completed = lessons.filter((l: any) => l.status === 'completed').length;
    const inProgress = lessons.filter((l: any) => l.status === 'in_progress').length;
    const upcoming = lessons.filter((l: any) => l.status === 'new').length;
    const cancelled = lessons.filter((l: any) => l.status === 'cancelled').length;

    return {
      total: lessons.length,
      completed,
      inProgress,
      upcoming,
      cancelled,
      progress: lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0
    };
  }, [lessons]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson: LessonsType) => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  // Status rendering functions
  const getStatusTag = (status: string) => {
    const statusConfig: any = {
      completed: { color: 'success', icon: <CheckCircleOutlined />, text: 'Success' },
      in_progress: { color: 'processing', icon: <SyncOutlined spin />, text: 'Processing' },
      new: { color: 'warning', icon: <ClockCircleOutlined />, text: 'New' },
      cancelled: { color: 'error', icon: <CloseCircleOutlined />, text: 'Cancelled' },
      
    };

    const config= statusConfig[status]  || statusConfig.new;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // MODAL HANDLERS - Bu yerda modal ochish funksiyalari
  const handleLessonView = (lesson: any) => {
    // TODO: Dars tafsilotlarini ko'rsatish modal ochish
    console.log('Dars tafsilotlari modal:', lesson);
  };

  const handleLessonEdit = (lesson: any) => {
    // TODO: Darsni tahrirlash modal ochish
    console.log('Darsni tahrirlash modal:', lesson);
  };

  const handleAddLesson = () => {
    // TODO: Yangi dars qo'shish modal ochish
    console.log('Yangi dars qo\'shish modal');
  };

  const handleAddStudent = () => {
    // TODO: Yangi talaba qo'shish modal ochish
    console.log('Yangi talaba qo\'shish modal');
  };

  // Lessons table columns
  const lessonColumns = [
    {
      title: 'Lesson name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Description',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true
    },
    {
      title: 'Start Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('uz-UZ')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Ko'rish">
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleLessonView(record)} // MODAL: Dars tafsilotlari
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleLessonEdit(record)} // MODAL: Darsni tahrirlash
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // Loading state
  if (!groupData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Ma'lumotlar yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2} style={{ margin: 0 }}>
                  {groupData.name}
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {groupData.course?.title || 'Course'}
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Tag icon={<ClockCircleOutlined />}>
                    {groupData.start_time} - {groupData.end_time}
                  </Tag>
                  <Tag>
                    Haftada {groupData.course?.lessons_in_a_week || 0} dars
                  </Tag>
                </div>
              </Col>
              <Col>
                <div style={{ textAlign: 'right' }}>
                  <Progress
                    type="circle"
                    percent={stats.progress}
                    size={80}
                    format={(percent) => `${percent}%`}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Tag color={groupData.status === 'active' ? 'success' : 'default'}>
                      {groupData.status?.toUpperCase() || 'ACTIVE'}
                    </Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                {stats.total}
              </Title>
              <Text>All Lessons</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ margin: 0, color: '#52c41a' }}>
                {stats.completed}
              </Title>
              <Text>Finished</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ margin: 0, color: '#faad14' }}>
                {stats.upcoming}
              </Title>
              <Text>Pending</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
                {stats.cancelled}
              </Title>
              <Text>Cancelled</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Course Info */}
        <Col xs={24} lg={16}>
          <Card title="Course information" style={{ marginBottom: 16 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Start Date">
                {new Date(groupData.start_date).toLocaleDateString('uz-UZ')}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {new Date(groupData.end_date).toLocaleDateString('uz-UZ')}
              </Descriptions.Item>
              <Descriptions.Item label="Duration">
                {groupData.course?.duration || 0} oy
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {groupData.course?.price?.toLocaleString() || '0'} so'm
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {groupData.course?.description || 'No description'}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Lessons Table */}
          <Card
            title="Lessons list"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddLesson} // MODAL: Yangi dars qo'shish
              >
                Yangi Dars
              </Button>
            }
          >
            <Space style={{ marginBottom: 16, width: '100%' }} direction="vertical">
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={16}>
                  <Input
                    placeholder="Search lesson by title"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Filter by status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                  >
                    <Option value="all">Barcha</Option>
                    <Option value="completed">Tugallangan</Option>
                    <Option value="in_progress">Jarayonda</Option>
                    <Option value="new">Yangi</Option>
                    <Option value="cancelled">Bekor qilingan</Option>
                  </Select>
                </Col>
              </Row>
            </Space>

            <Table
              columns={lessonColumns}
              dataSource={filteredLessons}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Lessons: ${total}`
              }}
              size="middle"
            />
          </Card>
        </Col>

        {/* Participants */}
        <Col xs={24} lg={8}>
          {/* Teacher */}
          {teacherData && (
            <Card title="Teacher" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar
                  size={64}
                  src={teacherData.avatar_url}
                  icon={<UserOutlined />}
                />
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {teacherData.first_name} {teacherData.last_name}
                  </Title>
                  <Text type="secondary">{teacherData.role}</Text>
                  <div style={{ marginTop: 8 }}>
                    <div>{teacherData.email}</div>
                    <div>{teacherData.phone}</div>
                    <Tag color={teacherData.is_active ? 'success' : 'default'}>
                      {teacherData.is_active ? 'Active' : 'Inactive'}
                    </Tag>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Student */}
          <Card
            title="Students"
            extra={
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={handleAddStudent} // MODAL: Yangi talaba qo'shish
              >
                Add
              </Button>
            }
          >
            {studentData ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar
                  size={48}
                  src={studentData.avatar_url}
                  icon={<UserOutlined />}
                />
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    {studentData.first_name} {studentData.last_name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {studentData.email}
                  </Text>
                  <div style={{ marginTop: 4 }}>
                    <Text style={{ fontSize: 12 }}>{studentData.phone}</Text>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <UserOutlined style={{ fontSize: 32, color: '#d9d9d9' }} />
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">Hech qanday talaba yo'q</Text>
                </div>
                <Button
                  type="dashed"
                  style={{ marginTop: 8 }}
                  onClick={handleAddStudent} // MODAL: Yangi talaba qo'shish
                >
                  Add student
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleGroup;