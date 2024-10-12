'use client'
import { ActionRenderCell, InfoRenderCell, StudentRenderCell, SubjectsRenderCell, TeacherRenderCell } from '@/components/RenderCell';

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