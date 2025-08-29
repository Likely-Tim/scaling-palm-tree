'use client';

import HaToggle from './ha_toggle';

export interface HaLightProps {
    state: string;
    entityId: string;
}

export default function HaLight(props: HaLightProps) {
    return (
        <HaToggle
            key={`${props.entityId}-${props.state}`}
            state={props.state}
            entityId={props.entityId}
            domain="light"
        />
    );
}
