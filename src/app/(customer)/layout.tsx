import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section>
        {/* customer navbar here*/}
        <div></div>


        <div>
            {children}
        </div>
    </section>
  )
}

export default layout
