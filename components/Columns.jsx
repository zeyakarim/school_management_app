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
        headerName: 'Subject Name'
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