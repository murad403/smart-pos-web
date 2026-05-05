import StaffNavbar from '@/components/shared/StaffNavbar'
import React from 'react'

const StaffLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <section>
            <StaffNavbar/>

            <div className={`pt-18 pb-12 md:pb-0 bg-[#FAF8F2]`}>
                {children}
            </div>
        </section>
    )
}

export default StaffLayout
