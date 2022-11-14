import React, { useEffect, useState } from 'react'
import data from "../data/data.json"
import { Card, Col, Input, Menu, notification, Row } from 'antd'
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined, CloseSquareOutlined, HeartFilled } from '@ant-design/icons';

const AllMovies = ({ moviesData, setMoviesData }) => {
    const { Search } = Input;
    const { Meta } = Card;
    const [selectedMovies, setSelectedMovies] = useState([])
    const [buttonClicked, setButtonClicked] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        setSelectedMovies(data["movies-in-theaters"])
        setButtonClicked("movies-in-theaters")
    }, [])

    const fetchMovies = (movieType) => {
        setButtonClicked(movieType)
        setSelectedMovies(moviesData[movieType])
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Menu mode="horizontal" defaultSelectedKeys={["movies-in-theaters"]} style={{
                    width: "-webkit-fill-available"
                }}>
                    <Menu.Item onClick={() => { fetchMovies("movies-in-theaters") }} key="movies-in-theaters" >
                        Movies in theaters
                    </Menu.Item>
                    <Menu.Item onClick={() => { fetchMovies("movies-coming") }} key="movies-coming">
                        Coming soon
                    </Menu.Item>
                    <Menu.Item onClick={() => { fetchMovies("top-rated-india") }} key="top-rated-india">
                        Top rated indian
                    </Menu.Item>
                    <Menu.Item onClick={() => { fetchMovies("top-rated-movies") }} key="top-rated-movies">
                        Top rated movies
                    </Menu.Item>
                    <Menu.Item onClick={() => { fetchMovies("favourite") }} key="favourite">
                        Favourites
                    </Menu.Item>
                </Menu>
                <Search style={{
                    width: "auto",
                    marginTop: "6px",
                    borderBottom: "1px solid lightgrey",
                }} placeholder="search movies here" onSearch={(value) => {
                    if (value === "") {
                        setSelectedMovies(moviesData[buttonClicked])
                    }
                    else {
                        const listOfMovies = Object.keys(moviesData).map((item) => {
                            if (item !== "favourite") {
                                return [...moviesData[item]]
                            }
                            return undefined;
                        }).flat().filter((item) => item !== undefined)
                        const searchedMovie = listOfMovies.filter((mydata) =>
                            mydata.title.toLowerCase().includes(value.toLowerCase())
                        )
                        setSelectedMovies(searchedMovie)
                    }
                }} enterButton />
            </div>
            <h2 style={{ margin: "17px" }}>{buttonClicked === "favourite" ? "Favourites" : "Movies"}</h2>
            {Array.isArray(selectedMovies) && selectedMovies.length > 0 ?
                <Row gutter={[24, 12]}>
                    {selectedMovies.map((data) => {
                        return (
                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                <Card
                                    style={{ width: 230, marginLeft: "20px" }}
                                    cover={
                                        <img
                                            onClick={() => { navigate(`/movie/${data.title}/category/${buttonClicked}`) }}
                                            style={{ maxHeight: "303px" }}
                                            alt={data?.title}
                                            src={data?.posterurl}
                                        />
                                    }
                                >
                                    <Meta
                                        onClick={() => { navigate(`/movie/${data.title}/category/${buttonClicked}`) }}
                                        title={data?.title}
                                    />
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "12px",
                                        marginBottom: "-4px",
                                        color: "grey"
                                    }}>
                                        {buttonClicked === "favourite" ?
                                            <div style={{ textTransform: "capitalize" }} onClick={(() => {
                                                const myfav = moviesData?.favourite?.filter((favMovie) => favMovie.releaseDate !== data.releaseDate && favMovie.title !== data.title)
                                                setMoviesData({ ...moviesData, favourite: myfav })
                                                setSelectedMovies(myfav)
                                                notification.open({
                                                    message: 'success',
                                                    description:
                                                        'Successfully removed from favourite',
                                                    icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                                                });
                                            })}>remove from favourites <CloseSquareOutlined /></div> :
                                            <div style={{ textTransform: "capitalize" }} onClick={(() => {
                                                if (moviesData?.favourite?.find((item) => item.releaseDate === data.releaseDate && item.title === data.title)) {
                                                    notification.open({
                                                        message: 'error',
                                                        description:
                                                            'Already added in favourite',
                                                        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
                                                    });
                                                } else {
                                                    setMoviesData({ ...moviesData, favourite: [...moviesData.favourite, data] })
                                                    notification.open({
                                                        message: 'success',
                                                        description:
                                                            'Successfully added to favourite',
                                                        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                                                    });
                                                }
                                            })}>add to favourites <HeartFilled style={{ color: "red" }} /></div>}
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                : <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16rem"
                }}>No data found</div>}

        </div>
    )
}

export default AllMovies