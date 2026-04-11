import React from 'react'

const InvoiceDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    console.log(id)
    return (
        <div>Invoice Details: {id}</div>
    )
}

export default InvoiceDetails