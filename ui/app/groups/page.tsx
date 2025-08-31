import { Container } from '@chakra-ui/react';
import GroupBlock from '../_components/group_block';
import { getGroups } from '../_actions/server_client_actions';

export default async function Page() {
    const groups = await getGroups();
    return (
        <Container>
            <GroupBlock name={'Group Management'} groups={groups} />
        </Container>
    );
}
