import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, notification} from "antd";
import axios from "../../../config/axios";

const openNotification = (title, message, type) => {
    notification[type]({
        message: title,
        description: message,
        placement: "bottomRight"
    });
};

const BannerCommunity = ({slug}) => {
    const [community, setCommunity] = useState();
    const [memberUser, setMemberUser] = useState(false);

    const getCommunity = async (community) => {
        try {
            const response = await axios.get(`/api/communities/getCommunity/${community}`);
            if (response.data.community) {
                setCommunity(response.data.community)
            } else {
                setCommunity(null)
            }
        } catch (e) {
            setCommunity(null)
            console.log(e)
        }
    }

    const getMemberUser = async (community) => {
        const response = await axios.post(`/api/communities/memberUser`, {community});
        setMemberUser(response.data.member)
    }

    useEffect(() => {
        const community = slug;
        getCommunity(community)
        getMemberUser(community)
    }, []);

    const toggleMemberUser = async (community) => {
        const response = await axios.post(`/api/communities/joinOrLeave`, {community});
        setMemberUser(response.data.member)
        if (response.data.member) {
            openNotification("Correcto", "Te has unido a esta comunidad", "success")
        } else {
            openNotification("Correcto", "Has salido de esta comunidad", "success")
        }
    }

    const getButtonJoin = (status) => {
        if (!status) {
            return <Button block onClick={() => toggleMemberUser(community.slug)} type="primary" size="medium">
                UNIRSE
            </Button>
        } else {
            return <Button block onClick={() => toggleMemberUser(community.slug)} type="primary" size="medium">
                DEJAR COMUNIDAD
            </Button>
        }

    }

    return (
        <>
            <div className="container-fluid mx-0 p-0 card justify-content-center text-center">
                <img className="w-75 mx-auto" height="200"
                     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt=""/>
                <div className="container text-left">
                    <List
                        className="mb-0 p-0"
                        itemLayout="vertical"
                        size="large">
                        <List.Item
                            extra={getButtonJoin(memberUser)}
                            key={community.slug}>
                            <List.Item.Meta
                                avatar={<Avatar
                                    size={75}
                                    src={"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}/>}
                                title={<h2 className="mb-0">
                                    {community.name}
                                </h2>}
                                description={community.slug}/>
                        </List.Item>
                    </List>
                </div>
            </div>
        </>
    );
};
export default BannerCommunity;