import { useAuthUser } from '@/components/providers/AuthUserProvider'
import React, { use } from 'react'
import isMe from '../actions/isMe.action'
import { redirect } from 'next/navigation'


const InvoiceLayout = async (
    { children }: { children: React.ReactNode }
) => {

    const user = await isMe.getCurrentUser() as any
    if (!user || user.role !== 'ADMIN') {
        redirect('/home')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default InvoiceLayout