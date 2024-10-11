import moment from 'moment-timezone';

export const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/home.png",
          label: "Home",
          href: "/",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/student.png",
          label: "Students",
          href: "/students",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/parent.png",
          label: "Parents",
          href: "/parents",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/subject.png",
          label: "Subjects",
          href: "/subjects",
          visible: ["admin"],
        },
        {
          icon: "/class.png",
          label: "Classes",
          href: "/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/lesson.png",
          label: "Lessons",
          href: "/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/exams",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/assignment.png",
          label: "Assignments",
          href: "/assignments",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/result.png",
          label: "Results",
          href: "/results",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/attendance.png",
          label: "Attendance",
          href: "/attendance",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/calendar.png",
          label: "Events",
          href: "/events",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/message.png",
          label: "Messages",
          href: "/messages",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/announcement.png",
          label: "Announcements",
          href: "/announcements",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: "/profile.png",
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/setting.png",
          label: "Settings",
          href: "/settings",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: "/logout.png",
          label: "Logout",
          href: "/logout",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
];

export const adminDashboardCards = [
    {
        title: 'Admins',
        count: 5,
        session: '2024/25'
    },
    {
        title: 'Teachers',
        count: 24,
        session: '2024/25'
    },
    {
        title: 'Students',
        count: 540,
        session: '2024/25'
    },
    {
        title: 'Parents',
        count: 350,
        session: '2024/25'
    }
]


export const columns = [
  // {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];
export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export const teacherDetailsItems = [
  {
    icon: "/singleAttendance.png",
    title: "Attendance",
    number: "90%"
  },
  {
    icon: "/singleBranch.png",
    title: "Branches",
    number: 20
  },
  {
    icon: "/singleLesson.png",
    title: "Lessons",
    number: 10
  },
  {
    icon: "/singleClass.png",
    title: "Classes",
    number: 15
  },
];

export const teacherShortcutItems = [
  {
    title: `Teacher's Classes`,
    url: '/classes?supervisorId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Teacher's Students`,
    url: '/students?teacherId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Teacher's Lessons`,
    url: '/lessons?teacherId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Teacher's Exams`,
    url: '/exams?teacherId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Teacher's Assignments`,
    url: '/assignments?teacherId',
    classes: "p-2 rounded-md"
  },
]

export const studentShortcutItems = [
  {
    title: `Student Lessons`,
    url: '/lessons?classId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Student Teachers`,
    url: '/teachers?classId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Student Exams`,
    url: '/exams?classId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Student Assignments`,
    url: '/assignments?classId',
    classes: "p-2 rounded-md"
  },
  {
    title: `Student Results`,
    url: '/results?studentId',
    classes: `p-2 rounded-md`
  },
]

export const shortcutBgColor = {
  1: '#EDF9FD',
  2: '#F1F0FF',
  3: '#FEFCE8',
  4: '#fdf2f8',
  5: '#EDF9FD'
}

export const studentDetailsItems = [
  {
    icon: "/singleAttendance.png",
    title: "Attendance",
    number: "98%"
  },
  {
    icon: "/singleBranch.png",
    title: "Grade",
    number: "6th"
  },
  {
    icon: "/singleLesson.png",
    title: "Lessons",
    number: 8
  },
  {
    icon: "/singleClass.png",
    title: "Class Name",
    number: "6A"
  },
];

const calendarEvents = [
  {
    id: 1,
    title: "Math",
    allDay: false,
    startDate: new Date('2024-10-07T08:00:00'),
    endDate: new Date('2024-10-07T08:45:00'),
  },
  {
    id: 2,
    title: "English",
    allDay: false,
    startDate: new Date('2024-10-07T09:00:00'),
    endDate: new Date('2024-10-07T09:45:00'),
  },
  {
    id: 3,
    title: "Biology",
    allDay: false,
    startDate: new Date('2024-10-07T10:00:00'),
    endDate: new Date('2024-10-07T10:45:00'),
  },
  {
    id: 4,
    title: "Physics",
    allDay: false,
    startDate: new Date('2024-10-07T11:00:00'),
    endDate: new Date('2024-10-07T11:45:00'),
  },
  {
    id: 5,
    title: "Chemistry",
    allDay: false,
    startDate: new Date('2024-10-07T13:00:00'),
    endDate: new Date('2024-10-07T13:45:00'),
  },
  {
    id: 6,
    title: "History",
    allDay: false,
    startDate: new Date('2024-10-07T14:00:00'),
    endDate: new Date('2024-10-07T14:45:00'),
  },
  {
    id: 7,
    title: "English",
    allDay: false,
    startDate: new Date('2024-10-08T08:00:00'),
    endDate: new Date('2024-10-08T08:45:00'),
  },
  {
    id: 8,
    title: "Biology",
    allDay: false,
    startDate: new Date('2024-10-08T10:00:00'),
    endDate: new Date('2024-10-08T10:45:00'),
  },
  {
    id: 9,
    title: "Physics",
    allDay: false,
    startDate: new Date('2024-10-08T11:00:00'),
    endDate: new Date('2024-10-08T11:45:00'),
  },
  {
    id: 10,
    title: "History",
    allDay: false,
    startDate: new Date('2024-10-08T14:00:00'),
    endDate: new Date('2024-10-08T14:45:00'),
  },
  {
    title: "Math",
    allDay: false,
    startDate: new Date('2024-10-09T08:00:00'),
    endDate: new Date('2024-10-09T08:45:00'),
  },
  {
    title: "Biology",
    allDay: false,
    startDate: new Date('2024-10-09T10:00:00'),
    endDate: new Date('2024-10-09T10:45:00'),
  },

  {
    title: "Chemistry",
    allDay: false,
    startDate: new Date('2024-10-09T13:00:00'),
    endDate: new Date('2024-10-09T13:45:00'),
  },
  {
    title: "History",
    allDay: false,
    startDate: new Date('2024-10-09T14:00:00'),
    endDate: new Date('2024-10-09T14:45:00'),
  },
  {
    title: "English",
    allDay: false,
    startDate: new Date('2024-10-10T09:00:00'),
    endDate: new Date('2024-10-10T09:45:00'),
  },
  {
    title: "Biology",
    allDay: false,
    startDate: new Date('2024-10-10T10:00:00'),
    endDate: new Date('2024-10-10T10:45:00'),
  },
  {
    title: "Physics",
    allDay: false,
    startDate: new Date('2024-10-10T11:00:00'),
    endDate: new Date('2024-10-10T11:45:00'),
  },
  {
    title: "History",
    allDay: false,
    startDate: new Date('2024-10-10T14:00:00'),
    endDate: new Date('2024-10-10T14:45:00'),
  },
  {
    title: "Math",
    allDay: false,
    startDate: new Date('2024-10-11T08:00:00'),
    endDate: new Date('2024-10-11T08:45:00'),
  },
  {
    title: "English",
    allDay: false,
    startDate: new Date('2024-10-11T09:00:00'),
    endDate: new Date('2024-10-11T09:45:00'),
  },
  {
    title: "Physics",
    allDay: false,
    startDate: new Date('2024-10-11T11:00:00'),
    endDate: new Date('2024-10-11T11:45:00'),
  },
  {
    title: "Chemistry",
    allDay: false,
    startDate: new Date('2024-10-11T13:00:00'),
    endDate: new Date('2024-10-11T13:45:00'),
  },
  {
    title: "History",
    allDay: false,
    startDate: new Date('2024-10-11T14:00:00'),
    endDate: new Date('2024-10-11T14:45:00'),
  },
];

export const calendarEventsUpdate = calendarEvents.map(event => ({
  ...event,
  start: moment.tz(event.start, 'Asia/Kolkata').toDate(),
  end: moment.tz(event.end, 'Asia/Kolkata').toDate(),
}));