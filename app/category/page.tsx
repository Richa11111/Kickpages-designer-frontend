import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ComplexTable from "./complex-table"


interface Props { }
export default function Template({ }: Props) {
    return (
        <div className='w-[1266px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <ComplexTable />
                </CardContent>
            </Card>
        </div>
    )
}
