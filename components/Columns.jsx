'use client'
import { ActionRenderCell, InfoRenderCell, SubjectsRenderCell } from '@/components/RenderCell';

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