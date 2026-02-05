
import React, { useState } from 'react';
import ChipContainerReact from './ChipContainerReact.jsx';

const ContentItem = ({ image, title, description, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <div className="w-full h-175 flex flex-col gap-2 cursor-pointer border-b border-border-default">
            <div class="relative w-full h-125 mb-2 rounded-lg object-fill ">
                <div className="absolute inset-0 bg-bg-images z-10 rounded-lg"></div>
                <img className="w-full h-full rounded-lg z-20 opacity-95 relative inset-0 " src={image} />
            </div>
            <ChipContainerReact>{children}</ChipContainerReact>
            <div className="flex flex-col my-2 gap-1">
                <h3 className="text-secondary-text text-primary bold">{title}</h3>
                <button className="flex flex-row text-start cursor-pointer text-secondary-text text-primary" onClick={toggleExpand}>
                    
                    {isExpanded ? (
                        description
                    ) : (
                        <div className='inline'>
                        {description.substring(0, 200)}
                        <span className="text-secondary">... more</span>
                        </div>
                    )}

                </button>
            </div>
        </div>
    );
}

export default ContentItem;