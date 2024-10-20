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
    parent: 'Robert Disouza',
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
    parent: 'Lang Fong',
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
    parent: 'Elbet Andrews',
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
    parent: 'Harran Folk',
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
    parent: 'Copper Holl',
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
    parent: 'Farhan Kall',
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
    parent: 'Kim Deus',
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
    parent: 'Nalbon Urade',
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
    parent: 'John Auliya',
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
    parent: 'Daniel Richard',
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

export const classes = [
  {
    id: 1,
    name: "1A",
    capacity: 25,
    supervisor: 'Johnson'
  },
  {
    id: 2,
    name: "2A",
    capacity: 20,
    supervisor: 'Elbert Deo'
  },
  {
    id: 3,
    name: "3A",
    capacity: 30,
    supervisor: 'Emma Balker'
  },
  {
    id: 4,
    name: "4A",
    capacity: 35,
    supervisor: 'Olive Foren'
  },
  {
    id: 5,
    name: "5A",
    capacity: 25,
    supervisor: 'Ava Harris'
  },
  {
    id: 6,
    name: "6A",
    capacity: 40,
    supervisor: 'Elbar John'
  },
  {
    id: 7,
    name: "2B",
    capacity: 25,
    supervisor: 'Thomas Andar'
  },
  {
    id: 8,
    name: "3B",
    capacity: 30,
    supervisor: 'Mason Green'
  },
  {
    id: 9,
    name: "6B",
    capacity: 45,
    supervisor: 'Micheal Stat'
  },
  {
    id: 10,
    name: "4B",
    capacity: 25,
    supervisor: 'Sophia Foaster'
  },
];

export const lessons = [
  {
    id: 1,
    name: "Math",
    class: "1A",
    teacher: 'Tony Reichert'
  },
  {
    id: 2,
    name: "Chemistry",
    class: "2A",
    teacher: 'Zoen Lang'
  },
  {
    id: 3,
    name: "English",
    class: "3A",
    teacher: "Jane Fisher"
  },
  {
    id: 4,
    name: "Urdu",
    class: "4A",
    teacher: "William Howard"
  },
  {
    id: 5,
    name: "Drawing",
    class: "5A",
    teacher: "Kristen Copper"
  },
  {
    id: 6,
    name: "Physics",
    class: "6A",
    teacher: "Ronaldo"
  },
  {
    id: 7,
    name: "History",
    class: "2B",
    teacher: "Brian Kim"
  },
  {
    id: 8,
    name: "Biology",
    class: "3B",
    teacher: "Emma Adams"
  },
  {
    id: 9,
    name: "G.K",
    class: "2C",
    teacher: "Kylas lias"
  },
  {
    id: 10,
    name: "Moral Science",
    class: "4B",
    teacher: "Richards"
  },
];

export const exams = [
  {
    id: 1,
    name: "Math",
    class: "1A",
    teacher: 'Tony Reichert',
    date: '12/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 2,
    name: "Chemistry",
    class: "2A",
    teacher: 'Zoen Lang',
    date: '14/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 3,
    name: "English",
    class: "3A",
    teacher: "Jane Fisher",
    date: '15/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 4,
    name: "Urdu",
    class: "4A",
    teacher: "William Howard",
    date: '16/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 5,
    name: "Drawing",
    class: "5A",
    teacher: "Kristen Copper",
    date: '17/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 6,
    name: "Physics",
    class: "6A",
    teacher: "Ronaldo",
    date: '18/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 7,
    name: "History",
    class: "2B",
    teacher: "Brian Kim",
    date: '19/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 8,
    name: "Biology",
    class: "3B",
    teacher: "Emma Adams",
    date: '21/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 9,
    name: "G.K",
    class: "2C",
    teacher: "Kylas lias",
    date: '22/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
  {
    id: 10,
    name: "Moral Science",
    class: "4B",
    teacher: "Richards",
    date: '23/10/2024',
    timing: '9:00 AM to 12:00 PM'
  },
];

export const assignments = [
  {
    id: 1,
    name: "Math",
    assignmentName: 'Calculation Project',
    class: "1A",
    teacher: 'Tony Reichert',
    submitDate: '25/10/2024'
  },
  {
    id: 2,
    name: "Chemistry",
    assignmentName: 'H2O Project',
    class: "2A",
    teacher: 'Zoen Lang',
    submitDate: '26/10/2024'
  },
  {
    id: 3,
    name: "English",
    assignmentName: 'English Phrases Project',
    class: "3A",
    teacher: "Jane Fisher",
    submitDate: '26/10/2024'
  },
  {
    id: 4,
    name: "Urdu",
    assignmentName: 'Urdu Spoken',
    class: "4A",
    teacher: "William Howard",
    submitDate: '27/10/2024'
  },
  {
    id: 5,
    name: "Drawing",
    assignmentName: 'Nature Pictures',
    class: "5A",
    teacher: "Kristen Copper",
    submitDate: '25/10/2024'
  },
  {
    id: 6,
    name: "Physics",
    assignmentName: 'Fundamental of Physics',
    class: "6A",
    teacher: "Ronaldo",
    submitDate: '27/10/2024'
  },
  {
    id: 7,
    name: "History",
    assignmentName: 'Modern India',
    class: "2B",
    teacher: "Brian Kim",
    submitDate: '28/10/2024'
  },
  {
    id: 8,
    name: "Biology",
    assignmentName: 'Fundamental of Biology',
    class: "3B",
    teacher: "Emma Adams",
    submitDate: '28/10/2024'
  },
  {
    id: 9,
    name: "G.K",
    assignmentName: 'Basic General Knowledge',
    class: "2C",
    teacher: "Kylas lias",
    submitDate: '29/10/2024'
  },
  {
    id: 10,
    name: "Moral Science",
    assignmentName: 'Moral Science Ch-1',
    class: "4B",
    teacher: "Richards",
    submitDate: '30/10/2024'
  },
];

export const results = [
  {
    id: 1,
    sno: 1,
    studentName: "Arham Rios",
    grade: 'A+',
    percentage: "75%",
    marks: '375 / 500',
    class: '2A'
  },
  {
    id: 2,
    sno: 2,
    studentName: "Faris Rayas",
    grade: 'A',
    percentage: "70%",
    marks: '350 / 500',
    class: '2B'
  },
  {
    id: 3,
    sno: 3,
    studentName: "John Deo",
    grade: 'B',
    percentage: "50%",
    marks: '250 / 500',
    class: '2B'
  },
  {
    id: 4,
    sno: 4,
    studentName: "Michel Farade",
    grade: 'C',
    percentage: "40%",
    marks: '200 / 500',
    class: '3B'
  },
  {
    id: 5,
    sno: 5,
    studentName: "Olvert Disouza",
    grade: 'B+',
    percentage: "55%",
    marks: '225 / 500',
    class: '3A'
  },
  {
    id: 6,
    sno: 6,
    studentName: "Rayan Fal",
    grade: 'A',
    percentage: "70%",
    marks: '350 / 500',
    class: '4A'
  },
  {
    id: 7,
    sno: 7,
    studentName: "Kiran George",
    grade: 'B',
    percentage: "50%",
    marks: '250 / 500',
    class: '5B'
  },
  {
    id: 8,
    sno: 8,
    studentName: "Rafar Dock",
    grade: 'A+',
    percentage: "75%",
    marks: '375 / 500',
    class: '5A'
  },
  {
    id: 9,
    sno: 9,
    studentName: "Daniel Hoj",
    grade: 'C',
    percentage: "45%",
    marks: '225 / 500',
    class: '6A'
  },
  {
    id: 10,
    sno: 10,
    studentName: "Nick Abraham",
    grade: 'A',
    percentage: "70%",
    marks: '350 / 500',
    class: '6B'
  }
];

export const attendance = [
  {
    id: 1,
    sno: 1,
    studentName: "Arham Rios",
    daysAbsent: 12,
    daysPresent: 19,
    monthName: 'Oct',
    class: '2A'
  },
  {
    id: 2,
    sno: 2,
    studentName: "Faris Rayas",
    daysAbsent: 19,
    daysPresent: 12,
    monthName: 'Oct',
    class: '2B'
  },
  {
    id: 3,
    sno: 3,
    studentName: "John Deo",
    daysAbsent: 8,
    daysPresent: 23,
    monthName: 'Oct',
    class: '2B'
  },
  {
    id: 4,
    sno: 4,
    studentName: "Michel Farade",
    daysAbsent: 5,
    daysPresent: 26,
    monthName: 'Oct',
    class: '3B'
  },
  {
    id: 5,
    sno: 5,
    studentName: "Olvert Disouza",
    daysAbsent: 10,
    daysPresent: 21,
    monthName: 'Oct',
    class: '3A'
  },
  {
    id: 6,
    sno: 6,
    studentName: "Rayan Fal",
    daysAbsent: 3,
    daysPresent: 28,
    monthName: 'Oct',
    class: '4A'
  },
  {
    id: 7,
    sno: 7,
    studentName: "Kiran George",
    daysAbsent: 12,
    daysPresent: 19,
    monthName: 'Oct',
    class: '5B'
  },
  {
    id: 8,
    sno: 8,
    studentName: "Rafar Dock",
    daysAbsent: 15,
    daysPresent: 16,
    monthName: 'Oct',
    class: '5A'
  },
  {
    id: 9,
    sno: 9,
    studentName: "Daniel Hoj",
    daysAbsent: 12,
    daysPresent: 19,
    monthName: 'Oct',
    class: '6A'
  },
  {
    id: 10,
    sno: 10,
    studentName: "Nick Abraham",
    daysAbsent: 10,
    daysPresent: 21,
    monthName: 'Oct',
    class: '6B'
  }
];

export const events = [
  {
    id: 1,
    title: "Book Fair",
    class: "1A",
    date: '12/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: 2,
    title: "Sports Day",
    class: "2A",
    date: '13/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: 3,
    title: "Spelling Bee",
    class: "3A",
    date: '14/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: 4,
    title: "Spring Picnic",
    class: "3B",
    date: '15/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: 5,
    title: "Robotics Competition",
    class: "4A",
    date: '16/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: 6,
    title: "History Fair",
    class: "General",
    date: '17/10/2024',
    startTime: '9:00 AM',
    endTime: '11:00 AM'
  },
];

export const announcements = [
  {
    id: 1,
    title: "Sports Day Postponed",
    class: "General",
    date: '12/10/2024',
  },
  {
    id: 2,
    title: "Book Fair Opening",
    class: "General",
    date: '12/10/2024',
  },
  {
    id: 3,
    title: "Picture Day Reminder",
    class: "General",
    date: '12/10/2024',
  },
]

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