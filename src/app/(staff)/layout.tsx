import StaffNavbar from '@/components/shared/StaffNavbar'
import React from 'react'

const StaffLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <section>
            <StaffNavbar/>

            <div className={`pt-18 pb-12 md:pb-0`}>
                {children}
            </div>
        </section>
    )
}

export default StaffLayout
