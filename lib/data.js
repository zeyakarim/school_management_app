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
  {name: "INFO", uid: "info", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];
export const teachers = [
  {
    id: 1,
    name: "Tony Reichert",
    teacherId: 'TC1',
    subjects: ['Chemistry', 'Biology'],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    phone: "123-456-789",
    address: 'New Delhi, India'
  },
  {
    id: 2,
    name: "Zoey Lang",
    teacherId: 'TC2',
    subjects: ['Math', 'Physics', 'Science'],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    phone: "245-124-563",
    address: 'Madhya Pradesh, India'
  },
  {
    id: 3,
    name: "Jane Fisher",
    teacherId: 'TC3',
    subjects: ['History', 'English', 'Math', 'Science'],
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    phone: "765-432-187",
    address: 'West Bengal, India'
  },
  {
    id: 4,
    name: "William Howard",
    subjects: ['Urdu', 'G.K', 'Math', 'English', 'Computer'],
    teacherId: 'TC4',
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    phone: "983-765-982",
    address: 'Uttar Pradesh, India'
  },
  {
    id: 5,
    name: "Kristen Copper",
    teacherId: 'TC5',
    subjects: ['Computer', 'Urdu', 'G.K', 'Math', 'English'],
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    phone: "123-675-456",
    address: 'West Bengal, India'
  },
  {
    id: 6,
    name: "Ronaldo",
    teacherId: 'TC6',
    subjects: ['G.K', 'Math', 'English'],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "ronaldo@example.com",
    phone: "643-356-124",
    address: 'Bihar, India'
  },
  {
    id: 7,
    name: "Brian Kim",
    teacherId: 'TC7',
    subjects: ['Chemistry', 'Biology'],
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "brian.kim@example.com",
    phone: "917-456-345",
    address: 'Hyderabad, India'
  },
  {
    id: 8,
    name: "Emma Adams",
    teacherId: 'TC8',
    subjects: ['English'],
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
    phone: "145-780-567",
    address: 'West Bengal, India'
  },
  {
    id: 9,
    name: "Brandon Stevens",
    teacherId: 'TC9',
    subjects: ['Drawing', 'Math'],
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
    phone: "198-567-340",
    address: 'West Bengal, India'
  },
  {
    id: 10,
    name: "Megan Richards",
    teacherId: 'TC10',
    subjects: ['Hindi', 'English', 'Science'],
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
    phone: "456-365-670",
    address: 'West Bengal, India'
  },
];

export const students = [
  {
    id: 1,
    name: "Tony Reichert",
    studentId: 'ST1',
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    grade: "A+",
    email: "tony.reichert@example.com",
    phone: "123-456-789",
    address: 'New Delhi, India'
  },
  {
    id: 2,
    name: "Zoey Lang",
    studentId: 'ST2',
    grade: 'A',
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    phone: "245-124-563",
    address: 'Madhya Pradesh, India'
  },
  {
    id: 3,
    name: "Jane Fisher",
    studentId: 'ST3',
    grade: 'B',
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    phone: "765-432-187",
    address: 'West Bengal, India'
  },
  {
    id: 4,
    name: "William Howard",
    studentId: 'ST4',
    grade: 'A-',
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    phone: "983-765-982",
    address: 'Uttar Pradesh, India'
  },
  {
    id: 5,
    name: "Kristen Copper",
    studentId: 'ST5',
    grade: 'B+',
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    phone: "123-675-456",
    address: 'West Bengal, India'
  },
  {
    id: 6,
    name: "Ronaldo",
    studentId: 'ST6',
    grade: 'B-',
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "ronaldo@example.com",
    phone: "643-356-124",
    address: 'Bihar, India'
  },
  {
    id: 7,
    name: "Brian Kim",
    studentId: 'ST7',
    grade: 'C',
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "brian.kim@example.com",
    phone: "917-456-345",
    address: 'Hyderabad, India'
  },
  {
    id: 8,
    name: "Emma Adams",
    studentId: 'ST8',
    grade: 'C+',
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
    phone: "145-780-567",
    address: 'West Bengal, India'
  },
  {
    id: 9,
    name: "Brandon Stevens",
    studentId: 'ST9',
    grade: 'A',
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
    phone: "198-567-340",
    address: 'West Bengal, India'
  },
  {
    id: 10,
    name: "Megan Richards",
    studentId: 'ST10',
    grade: 'A+',
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
    phone: "456-365-670",
    address: 'West Bengal, India'
  },
];

export const parents = [
  {
    id: 1,
    name: "John Deo",
    studentName: ['Tony Reichert', 'Abraham'],
    email: "john.deo@example.com",
    phone: "123-456-789",
    address: 'New Delhi, India'
  },
  {
    id: 2,
    name: "Dyniel",
    studentName: ['Zoen Lang'],
    email: "dyniel@example.com",
    phone: "245-124-563",
    address: 'Madhya Pradesh, India'
  },
  {
    id: 3,
    name: "Robert Disouza",
    studentName: ["Jane Fisher", "Rahan", "Karthik"],
    email: "robert.disouza@example.com",
    phone: "765-432-187",
    address: 'West Bengal, India'
  },
  {
    id: 4,
    name: "Albert Deo",
    studentName: ["William Howard"],
    email: "albert.deo@example.com",
    phone: "983-765-982",
    address: 'Uttar Pradesh, India'
  },
  {
    id: 5,
    name: "John Albert",
    studentName: ["Kristen Copper", "Warner Rios"],
    email: "john.albert@example.com",
    phone: "123-675-456",
    address: 'West Bengal, India'
  },
  {
    id: 6,
    name: "Faren Lios",
    studentName: ["Ronaldo"],
    email: "faren.lios@example.com",
    phone: "643-356-124",
    address: 'Bihar, India'
  },
  {
    id: 7,
    name: "Aryan Kim",
    studentName: ["Brian Kim", "Ryan", "Tois"],
    email: "aryan.kim@example.com",
    phone: "917-456-345",
    address: 'Hyderabad, India'
  },
  {
    id: 8,
    name: "Adams",
    studentName: ["Emma Adams"],
    email: "adams@example.com",
    phone: "145-780-567",
    address: 'West Bengal, India'
  },
  {
    id: 9,
    name: "Lias Neon",
    studentName: ["Kylas lias"],
    email: "lias.neon@example.com",
    phone: "198-567-340",
    address: 'West Bengal, India'
  },
  {
    id: 10,
    name: "Faren Los",
    studentName: ["Richards", 'Abrin'],
    email: "faren.los@example.com",
    phone: "456-365-670",
    address: 'West Bengal, India'
  },
];

export const subjects = [
  {
    id: 1,
    name: "Math",
    teachers: ['Tony Reichert', 'Abraham']
  },
  {
    id: 2,
    name: "Chemistry",
    teachers: ['Zoen Lang']
  },
  {
    id: 3,
    name: "English",
    teachers: ["Jane Fisher", "Rahan", "Karthik"]
  },
  {
    id: 4,
    name: "Urdu",
    teachers: ["William Howard"]
  },
  {
    id: 5,
    name: "Drawing",
    teachers: ["Kristen Copper", "Warner Rios"]
  },
  {
    id: 6,
    name: "Physics",
    teachers: ["Ronaldo"]
  },
  {
    id: 7,
    name: "History",
    teachers: ["Brian Kim", "Ryan", "Tois"]
  },
  {
    id: 8,
    name: "Biology",
    teachers: ["Emma Adams"]
  },
  {
    id: 9,
    name: "G.K",
    teachers: ["Kylas lias"]
  },
  {
    id: 10,
    name: "Moral Science",
    teachers: ["Richards", 'Abrin']
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