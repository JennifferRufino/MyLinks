import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator} from 'react-native';

import Menu from '../../components/Menu';
import StatusBarPage from '../../components/StatusBarPage';
import ListItem from '../../components/ListItem';
import ModalLink from '../../components/ModalLink';
import { Container, Title, ListLinks, ContainerVazio, WarningText} from './styles';

import {useIsFocused} from '@react-navigation/native';

import {getLinkSave, deleteLink} from '../../utils/storeLinks';

export default function MyLinks(){

    const isFocused = useIsFocused();

    const [links, setLinks] = useState('');
    const [data, setData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getLinks() {
            const result = await getLinkSave('sujeitolinks');

            setLinks(result);
            setLoading(false);
        }

        getLinks();
    }, [isFocused]);

    function handleItem(item) {
        setData(item);
        setModalVisible(true);
    }

    async function handleDelete(id) {
        const result = await deleteLink(links, id);

        setLinks(result);
    }

    return(
        <Container>
            <StatusBarPage barStyle={'light-content'} backgroundColor="#132742" />

            <Menu />
            <Title>Meus Links</Title>

            { loading && (
                <ContainerVazio>
                    <ActivityIndicator color="#FFF" size={25}/>
                </ContainerVazio>
            )}
            {!loading && links.length === 0 && (
                <ContainerVazio>
                    <WarningText> Você ainda não possui nenhum link! :( </WarningText>
                </ContainerVazio>
            )}
            <ListLinks
                data={links}
                keyExtractor = {(item) => String(item.id)}
                renderItem = {({item}) => <ListItem data={item} selectedItem={handleItem} deleteItem={handleDelete} /> }
                contentContainerStyle = {{paddingBottom: 22}}
                showsVerticalScrollIndicator = {false}
            />
             <Modal visible={modalVisible} transparent animationType="slide">
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>
        </Container>
    );
}