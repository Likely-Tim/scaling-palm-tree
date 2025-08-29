'use client';

import HaToggle from './ha_toggle';

export interface HaSwitchProps {
    state: string;
    entityId: string;
}

export default function HaSwitch(props: HaSwitchProps) {
    return (
        <HaToggle
            key={`${props.entityId}-${props.state}`}
            state={props.state}
            entityId={props.entityId}
            domain="switch"
        />
    );
}
