import { he } from '@faker-js/faker/.';
import React from 'react';

interface CardProps {
    src: string;
    height: number;
    description?: string;
    price?: string;
    width?: number;
}

export const Card = ({
    src,
    description,
    height,
    width = 300,
    price
}: CardProps) => {
    return (
        <div style={{
            width: width + 'px'
        }}>
            <div>
                <img src={src} height={height + 'px'} />
            </div>
            <div>
                <span>{price}</span>

            </div>
            <div>
                <span>{description}</span>

            </div>
        </div>
    );
}