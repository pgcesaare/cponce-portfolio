
import React, { useState } from 'react';
import ChipContainerReact from './ChipContainerReact.jsx';

const ContentItem = ({ image, title, description, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        console.log("clicked");
        setIsExpanded(!isExpanded);
    }
    return (
        <div class="w-full h-175 flex flex-col gap-2 cursor-pointer border-b border-border-default">
            <div class="relative w-full h-125 mb-2 rounded-lg object-fill ">
                <div class="absolute inset-0 bg-bg-images z-10 rounded-lg"></div>
                <img class="w-full h-full rounded-lg z-20 opacity-95 relative inset-0 " src={image} />
            </div>
            <ChipContainerReact>{children}</ChipContainerReact>
            <div class="flex flex-col my-2 gap-1">
                <h3 class="text-secondary-text text-primary bold">{title}</h3>
                <button className="flex flex-row text-start cursor-pointer text-secondary-text text-primary" onClick={toggleExpand}>
                    {isExpanded ? (
                        description
                    ) : (
                        <div className='flex flex-row'>
                        {description.substring(0, 100)}
                        <span className="text-secondary">... more</span>
                        </div>
                    )}

                </button>
            </div>
        </div>
    );
}

export default ContentItem;