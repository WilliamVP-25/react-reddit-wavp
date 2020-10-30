import React, {useEffect, useState} from 'react';
import Layout from "../../layout/Layout";
import {Avatar, Button, Card, List, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategoriesAction,
    getCommunitiesByCategoryAction,
    selectCategoryAction
} from "../../../actions/communityActions";
import {Link, useParams, useHistory} from "react-router-dom";

const {Text} = Typography;

const Leaderboard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const {categories, loadingCommunity, categorySelected, communitiesByCategorySelected} = useSelector(state => state.community);
    const getCategories = () => dispatch(getCategoriesAction());
    const selectCategory = category => dispatch(selectCategoryAction(category));
    const getCommunitiesByCategory = category => dispatch(getCommunitiesByCategoryAction(category));

    const [categorySelectedInfo, setCategorySelectedInfo] = useState({
        name: ''
    });

    useEffect(() => {
        getCategories();
        const category = params.category ? params.category : 'all';
        selectCategory(category)
        getCommunitiesByCategory(category)
        let name;
        if (category !== "all") {
            name = category.replace("-", " ");
        } else {
            name = "Todas las categorias";
        }
        setCategorySelectedInfo({
            name,
            slug: category
        })
    }, []);

    if (loadingCommunity) return "loading";
    if (!categories) return "null";

    const onSelectCategory = (category) => {
        selectCategory(category.slug)
        getCommunitiesByCategory(category.slug)
        setCategorySelectedInfo({
            name: category.name,
            slug: category.slug
        })
    }

    return (
        <Layout>
            <div className="container-fluid mx-0 p-0 card">
                <div className="container p-4">
                    <h2 className="mb-0">Las principales comunidades en crecimiento de hoy en día</h2>
                    <Text type="secondary">Explore las principales comunidades en crecimiento de Reddit. Encuentra las
                        mejores
                        comunidades en tu categoría favorita.</Text>
                </div>
            </div>
            <div className="container-fluid mx-0 p-0 site-card-border-less-wrapper">
                <div className="container mb-3">
                    <div className="row py-5">
                        <div className="col-lg-2 d-lg-block d-sm-none d-xs-none">
                            <Card className="shadow-sm rounded-lg p-0 w-100" bodyStyle={{padding: 0}}
                                  title={<h3 className="mb-0">Categorías</h3>}
                                  bordered={false}>
                                <List
                                    className="m-0 p-0"
                                    size="small"
                                    bordered={false}>
                                    <List.Item onClick={() => onSelectCategory({name: "Todas", slug: "all"})}>
                                        <Link to={`/communities/leaderboard/all`}>
                                            <Text className={categorySelected === 'all' && 'text-primary'}>Todas</Text>
                                        </Link>
                                    </List.Item>
                                    {/*style={{
                                        borderBottomColor: 'rgb(66, 66, 66)',
                                        borderBottomWidth: 1,
                                        borderBottomStyle: 'solid'
                                    }}*/}
                                </List>
                                <List
                                    className="m-0 p-0"
                                    size="small"
                                    bordered={false}
                                    dataSource={categories}
                                    item
                                    renderItem={item =>
                                        <List.Item style={{cursor: 'pointer'}}
                                                   onClick={() => onSelectCategory(item)}>
                                            <Link to={`/communities/leaderboard/${item.slug}`}>
                                                <Text
                                                    className={categorySelected === item.slug && 'text-primary'}>{item.name}</Text>
                                            </Link>
                                        </List.Item>}/>
                            </Card>
                        </div>
                        <div className="col-lg-7">
                            <Card
                                className="shadow-sm rounded-lg p-0 w-100 mt-lg-0 mt-sm-5"
                                bodyStyle={{padding: 0}}
                                title={<Text className="mb-0" strong>El mejor crecimiento actual
                                    en {categorySelectedInfo.name}</Text>}
                                bordered={false}>
                                <List
                                    className="m-0 p-0"
                                    size="small"
                                    bordered={false}
                                    dataSource={communitiesByCategorySelected}
                                    renderItem={item =>
                                        <List.Item
                                            style={{cursor: 'pointer'}}
                                            onClick={() => history.push(`/communities/${item.slug}`)}>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                title={<Text>{item.name}</Text>}
                                                description={item.description}
                                            />
                                        </List.Item>}/>
                            </Card>
                        </div>

                        <div className="col-lg-3">
                            <Card
                                className="shadow-sm rounded-lg p-0"
                                bodyStyle={{padding: 5}}
                                title={<h4 className="mb-0">Explorar Comunidades A-Z</h4>}
                                bordered={false}>
                                <div className="justify-content-center">
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/A`)}>A</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>B</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>C</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>D</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>E</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>F</Button>
                                    <Button type="link"
                                            onClick={() => history.push(`/communities/explore/B`)}>G</Button>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Leaderboard;