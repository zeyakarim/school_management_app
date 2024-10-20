'use client'
import { ActionRenderCell, InfoRenderCell, StudentRenderCell, SubjectsRenderCell, TeacherRenderCell } from '@/components/RenderCell';
import { Chip } from '@nextui-org/react';

export const teacherColumns = [
    {
        field: 'info',
        headerName: 'Information',
        renderCell: (row) => InfoRenderCell(row)
    },
    {
        field: 'teacherId',
        headerName: 'Teacher ID'
    },
    {
        field: 'subjects',
        headerName: 'Subjects',
        renderCell: (row) => SubjectsRenderCell(row)
    },
    {
        field: 'phone',
        headerName: 'Phone'
    },
    {
        field: 'address',
        headerName: 'Address'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];
  
export const studentColumns = [
    {
        field: 'info',
        headerName: 'Information',
        renderCell: (row) => InfoRenderCell(row)
    },
    {
        field: 'parent',
        headerName: 'Parent'
    },
    {
        field: 'studentId',
        headerName: 'Student ID'
    },
    {
        field: 'grade',
        headerName: 'Grade'
    },
    {
        field: 'phone',
        headerName: 'Phone'
    },
    {
        field: 'address',
        headerName: 'Address'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const parentColumns = [
    {
        field: 'info',
        headerName: 'Information',
        renderCell: (row) => InfoRenderCell(row)
    },
    {
        field: 'studentName',
        headerName: 'Student Name',
        renderCell: (row) => StudentRenderCell(row)
    },
    {
        field: 'phone',
        headerName: 'Phone'
    },
    {
        field: 'address',
        headerName: 'Address'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const subjectColumns = [
    {
        field: 'name',
        headerName: 'Subject Name'
    },
    {
        field: 'teachers',
        headerName: 'Teachers',
        renderCell: (row) => TeacherRenderCell(row)
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const classesColumns = [
    {
        field: 'name',
        headerName: 'Class Name'
    },
    {
        field: 'capacity',
        headerName: 'Capacity'
    },
    {
        field: 'supervisor',
        headerName: 'Supervisor',
        renderCell: (row) => <Chip color="warning" variant='flat'>{row?.supervisor}</Chip>
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const lessonColumns = [
    {
        field: 'name',
        headerName: 'Subject Name'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
    {
        field: 'teacher',
        headerName: 'Teacher',
        renderCell: (row) => <Chip color="warning" variant='flat'>{row?.teacher}</Chip>
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const examColumns = [
    {
        field: 'name',
        headerName: 'Subject Name'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
    {
        field: 'teacher',
        headerName: 'Teacher',
        renderCell: (row) => <Chip color="warning" variant='flat'>{row?.teacher}</Chip>
    },
    {
        field: 'date',
        headerName: 'Date'
    },
    {
        field: 'timing',
        headerName: 'Timing'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const assignmentColumns = [
    {
        field: 'name',
        headerName: 'Subject Name'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
    {
        field: 'teacher',
        headerName: 'Teacher',
        renderCell: (row) => <Chip color="warning" variant='flat'>{row?.teacher}</Chip>
    },
    {
        field: 'submitDate',
        headerName: 'Submit Date'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (row) => ActionRenderCell(row)
    }
];

export const resultColumns = [
    {
        field: 'sno',
        headerName: 'S.No'
    },
    {
        field: 'studentName',
        headerName: 'Student',
        renderCell: (row) => (
            <Chip color="warning" variant='flat'>{row?.studentName}</Chip>
        )
    },
    {
        field: 'grade',
        headerName: 'Grade'
    },
    {
        field: 'percentage',
        headerName: 'Percentage'
    },
    {
        field: 'marks',
        headerName: 'Mark'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
];

export const attendanceColumns = [
    {
        field: 'sno',
        headerName: 'S.No'
    },
    {
        field: 'studentName',
        headerName: 'Student Name',
        renderCell: (row) => (
            <Chip color="warning" variant='flat'>{row?.studentName}</Chip>
        )
    },
    {
        field: 'daysAbsent',
        headerName: 'Days Absent'
    },
    {
        field: 'daysPresent',
        headerName: 'Days Present'
    },
    {
        field: 'monthName',
        headerName: 'Month'
    },
    {
        field: 'class',
        headerName: 'Class'
    }
];

export const eventColumns = [
    {
        field: 'title',
        headerName: 'Title'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
    {
        field: 'date',
        headerName: 'Date'
    },
    {
        field: 'startTime',
        headerName: 'Start Time'
    },
    {
        field: 'endTime',
        headerName: 'End Time'
    }
];

export const announcementColumns = [
    {
        field: 'title',
        headerName: 'Title'
    },
    {
        field: 'class',
        headerName: 'Class'
    },
    {
        field: 'date',
        headerName: 'Date'
    }
]