'use client';
import { useEffect } from 'react';
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Logout from '@/app/logout';
import { redirect, useRouter } from "next/navigation"
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main className='flex min-h-screen'>
            <div className='flex-1'>
                <Header>
                    {<Logout />}
                </Header>
                <Sidebar className='fixed hidden border-r xl:flex' />
                <div className='container mt-24 pb-8 xl:pl-[194px]'>{children}</div>
            </div>
        </main>
    )
}

