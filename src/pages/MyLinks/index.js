import React from 'react';

import Menu from '../../components/Menu';
import StatusBarPage from '../../components/StatusBarPage';
import ListItem from '../../components/ListItem';
import { Container, Title, ListLinks } from './styles';

export default function MyLinks(){
    return(
        <Container>
            <StatusBarPage barStyle={'light-content'} backgroundColor="#132742" />

            <Menu />
            <Title>Meus Links</Title>
            <ListLinks
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor = {(item) => String(item.id)}
                renderItem = {({item}) => <ListItem data={item} /> }
                contentContainerStyle = {{paddingBottom: 22}}
                showsVerticalScrollIndicator = {false}
            />
        </Container>
    );
}