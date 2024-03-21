"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import ComplexTable from "./complex-table"
import { FC, useEffect } from "react"

interface Props { }
export default function Template({ }: Props) {
    return (
        <div className='w-[1266px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Templates</CardTitle>
                </CardHeader>
                <CardContent>
                    <ComplexTable />
                </CardContent>
            </Card>
        </div>
    )
}
