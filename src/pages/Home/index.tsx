import React from "react";
import {
    Container,
    Header,
    UserAvatar,
    UserAvatarButton,
    UserGreeting,
    UserInfo,
    UserInfoDetail,
    UserName,
    UserWrapper,
    Icon
} from "./styles";

import avatarDefault from "../../assets/avatar02.png";

export const Home: React.FunctionComponent = () => {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <UserAvatarButton onPress={() => {}}>
                            <UserAvatar source={avatarDefault} />
                        </UserAvatarButton>
                        <UserInfoDetail>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Tiago...</UserName>
                        </UserInfoDetail>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
        </Container>
    );
};
