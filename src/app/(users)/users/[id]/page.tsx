import React from 'react'

const UserDetails = async({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params
   console.log(id)
    return (
        <div>
            UserDetails: {id}
        </div>
    )
}

export default UserDetails