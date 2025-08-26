'use client';

import {
    Container,
    Select,
    createListCollection,
    Heading,
    Grid
} from '@chakra-ui/react';
import DeviceCard from './device_card';
import { Device, DeviceWithCapabilities } from '../_models/device';
import { State } from '../_models/state';
import { capitalizeFirstCharacter } from '../utils/text_utils';
import { useState } from 'react';

export interface DeviceBlockProps {
    name: string;
    showRegisterButton: boolean;
    showDeregisterButton: boolean;
    data: Device[] | DeviceWithCapabilities[] | State[];
}

export default function DeviceBlock(props: DeviceBlockProps) {
    const [domainSelected, setDomainSelected] = useState<string | undefined>(
        undefined
    );
    const selectCollection = getListCollection(props.data);

    return (
        <Container
            backgroundColor={'#1a1918'}
            margin={'30px'}
            padding={'20px'}
            borderRadius={'20px'}
        >
            <Heading size={'3xl'} margin={'10px'} marginLeft={'0px'}>
                {props.name}
            </Heading>
            <Select.Root
                collection={selectCollection}
                onValueChange={details =>
                    setDomainSelected(details.value.at(0))
                }
                marginBottom="15px"
                width="200px"
            >
                <Select.HiddenSelect />
                <Select.Label>Filter By Domain:</Select.Label>
                <Select.Control backgroundColor={'black'}>
                    <Select.Trigger>
                        <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.ClearTrigger />
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        {selectCollection.items.map(item => (
                            <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
            <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={'10px'}>
                {props.data
                    .filter(
                        item =>
                            domainSelected == undefined ||
                            domainSelected == item.domain
                    )
                    .map(item => {
                        return (
                            <DeviceCard
                                key={item.entity_id}
                                domain={item.domain}
                                friendlyName={
                                    'friendly_name' in item
                                        ? item.friendly_name
                                        : item.attributes.friendly_name
                                }
                                entityId={item.entity_id}
                                state={'state' in item ? item.state : undefined}
                                capabilities={
                                    'capabilities' in item
                                        ? item.capabilities
                                        : undefined
                                }
                                showDeregisterButton={
                                    props.showDeregisterButton
                                }
                                showRegisterButton={props.showRegisterButton}
                            />
                        );
                    })}
            </Grid>
        </Container>
    );
}

function getListCollection(data: State[] | Device[]) {
    const domainTypes = [...new Set(data.map(item => item.domain))];
    const selectValues = domainTypes.map(domainType => {
        return {
            label: capitalizeFirstCharacter(domainType),
            value: domainType
        };
    });
    return createListCollection({ items: selectValues });
}
