import moment from 'moment-timezone';
import { 
  Home, School, People, FamilyRestroom,
  FormatListBulleted, AirlineSeatReclineNormal, AutoStories, Assignment,
  CoPresent, Grade, Attribution, CalendarMonth, Message, Campaign, FactCheck,
  Person, Settings, Logout
} from '@mui/icons-material';

export const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <Home />,
          label: "Home",
          href: "/",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <School />,
          label: "Teachers",
          href: "/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: <People />,
          label: "Students",
          href: "/students",
          visible: ["admin", "teacher"],
        },
        {
          icon: <FamilyRestroom />,
          label: "Parents",
          href: "/parents",
          visible: ["admin", "teacher"],
        },
        {
          icon: <AutoStories />,
          label: "Subjects",
          href: "/subjects",
          visible: ["admin"],
        },
        {
          icon: <AirlineSeatReclineNormal />,
          label: "Classes",
          href: "/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon: <FormatListBulleted />,
          label: "Lessons",
          href: "/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon: <FactCheck />,
          label: "Exams",
          href: "/exams",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Assignment />,
          label: "Assignments",
          href: "/assignments",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Grade />,
          label: "Grades",
          href: "/grades",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <CoPresent />,
          label: "Results",
          href: "/results",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Attribution />,
          label: "Attendance",
          href: "/attendance",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <CalendarMonth />,
          label: "Events",
          href: "/events",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Message />,
          label: "Messages",
          href: "/messages",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Campaign />,
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
          icon: <Person />,
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Settings />,
          label: "Settings",
          href: "/settings",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Logout />,
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