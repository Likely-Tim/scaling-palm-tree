import { Container } from '@chakra-ui/react';
import GroupBlock from '../_components/group_block';

export default async function Page() {
    return (
        <Container>
            <GroupBlock name={'Group Management'} />
        </Container>
    );
}
