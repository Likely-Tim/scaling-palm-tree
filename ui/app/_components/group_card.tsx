import { Card } from '@chakra-ui/react';
import { Group } from '../_models/group';
import { Device } from '../_models/device';
import { getGroupMembers } from '../_actions/server_client_actions';
import DeviceCard from './device_card';

export interface GroupCardProps {
	group: Group;
}

export default async function GroupCard(props: GroupCardProps) {
	const groupInfo = await getGroupMembers(props.group)
	const devices = groupInfo.devices as Device[];
	return (
		<Card.Root padding={"5px"} minWidth={"250px"}>
		<Card.Body>
			{devices.map(device => (
				<DeviceCard 
					domain={device.domain}
					friendlyName={device.friendly_name}
					entityId={device.entity_id}
				/>
			))}
		</Card.Body>
		<Card.Footer>
		</Card.Footer>
		</Card.Root>
	)
}
