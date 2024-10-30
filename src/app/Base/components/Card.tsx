import { he } from '@faker-js/faker/.';
import React from 'react';

interface CardProps {
    src: string;
    height: number;
    description?: string;
    width?: number;
}

export const Card = ({
    src,
    description,
    height,
    width = 300
}: CardProps) => {
    return (
        <div style={{
            width: width + 'px'
        }}>
            <div>
                <img src={src} height={height + 'px'} />
            </div>
            <div>
                <span>{description}</span>
            </div>
        </div>
    );
}