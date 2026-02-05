import React from 'react'

const ChipContainerReact = ({children}) => {
    return (
        <div className="w-full h-fit flex flex-wrap gap-2">
            {children}
        </div>
    )
}

export default ChipContainerReact