/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AboutMovies = ({ moviesData }) => {
  const { title, categoryId } = useParams()
  const navigate = useNavigate();
  const [movie, setMovie] = useState({})
  useEffect(() => {
    setMovie(moviesData[categoryId]?.find((item) => item?.title === title))
  }, [title, categoryId])

  const movieValue = [
    {
      name: "Imdb Rating",
      displayValue: "imdbRating"
    },
    {
      name: "Content Rating"
      , displayValue: "contentRating"
    },
    {
      name: "Average Rating"
      , displayValue: "averageRating"
    },
    {
      name: "Duration"
      , displayValue: "duration"
    },
    {
      name: "Genres"
      , displayValue: "genres"
    },
    {
      name: "Actors"
      , displayValue: "actors"
    },
    {
      name: "Release Date"
      , displayValue: "releaseDate"
    },
    {
      name: "Story Line"
      , displayValue: "storyline"
    },
  ]
  return (
    <div>
      <div style={{
        textTransform: "capitalize",
        color: "cornflowerblue",
        padding: "20px",
        borderBottom: "1px solid lightgrey"
      }}
        onClick={() => { navigate(`/`) }}>
        back to home
      </div>
      <div style={{ display: "flex", marginTop: "30px" }}>
        <Image
          style={{ width: "300px" }}
          src={movie?.posterurl}
        />
        <div style={{ paddingLeft: "20px" }}>
          <h1>{movie?.title} ({movie?.releaseDate})</h1>
          {movieValue?.map((item) => (
            <Row gutter={[24, 12]} style={{ margin: "20px 0px !important" }}>
              <Col xs={{ span: 24 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 10 }}
              >
                <div style={{ marginBottom: "20px" }}>{item?.name}</div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}
              >
                <div>{typeof movie[item?.displayValue] === "object" ?
                  movie[item?.displayValue].join(",") : movie[item?.displayValue]
                }</div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutMovies