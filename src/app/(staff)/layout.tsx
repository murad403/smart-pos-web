import StaffNavbar from '@/components/shared/StaffNavbar'
import React from 'react'

const StaffLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <section className="min-h-screen bg-[#FAF8F2]">
            <StaffNavbar/>

            <div className={`pt-18 pb-24 md:pb-0`}>
                {children}
            </div>
        </section>
    )
}

export default StaffLayout
