import { Card } from '@chakra-ui/react';
import { Group } from '../_models/group';

export interface GroupCardProps {
	group: Group;
}

export default function GroupCard(props: GroupCardProps) {
	return (
		<Card.Root padding={"5px"} minWidth={"250px"}>
		<Card.Body>
		</Card.Body>
		<Card.Footer>
		</Card.Footer>
		</Card.Root>
	)
}
