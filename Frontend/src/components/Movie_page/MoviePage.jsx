import { FaRegStar, FaStar, FaStarHalfAlt, FaPlus } from "react-icons/fa"
import "./index.css"
import imdb from '../../assets/imdb.svg'
import flixify from '../../assets/logo.svg'
import { TrailerCard } from "../mov_thumbn"
import ArrangeComp from "./ArrangeCompn"
import { Imgurl } from "@/constants/themes"

const Headline = ({heading}) => {
  return(
    <div className="row heading">
        <div className="htxt_">{heading}</div>
        <div className="line_"></div>
    </div>
  )
}

const TextComp = ({data}) => {
    let disptxt = ''
    for (let i = 0; i < data.length - 1; i++) {
        disptxt += data[i]
        disptxt += '  |  ' // Space to be adjusted

    }
    disptxt += data[data.length - 1]
  return(
    <div className="txt_">
        {/* <pre className="txt_">{disptxt}</pre> */}
        {disptxt}
    </div>
  )
}

const LangGen = ({data}) => {
    return (
        <div className="lg_">
            {data}
        </div>
    )
}

const Stars = ({data}) => {
    const stars = [];
    for (let i = 1; i < 11; i+=2) {
      if (i < data) {
        stars.push(<FaStar key={i} size={24} color="#F0AB00" />);
      } else if (i === data) {
        stars.push(<FaStarHalfAlt key={i} size={24} color="#F0AB00" />);
      } else {
        stars.push(<FaRegStar key={i} size={24} color="#F0AB00"/>);
      }
    }
    return <div className="star">{stars}</div>;
}

const Rating = ({data}) => {
    let logo_ = imdb
    let maxr = '/10'
    let x = data.val
    if (data.logo === 'flixify') {
        logo_ = flixify
        maxr = '/5'
        x *= 2
    }
    return (
        <div className="star-rating">
            <img src={logo_} className="logo_" />
            <Stars data={Math.round(x)} />
            <p className="rtxt_">{data.val}{maxr}</p>
        </div>
    )
}

function transformRatingObject(ratingObject) {
    return Object.entries(ratingObject).map(([platform, rating]) => ({
        logo: platform,
        val: rating
    }));
}

const HeadnTxt = ({heading, data}) => {
    return (
        <div className="headnTxt">
            <Headline heading={heading} />
            <TextComp data={data} />
        </div>
    )
}

const MoviePage_ = (props) => {
    let data = {
        title: "Avengers: Endgame",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        director: ['Anthony Russo', 'Joe Russo'],
        cast: ['Robert Downey Jr.', 'Scarlett Johannson', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo', 'Jeremy Ranner', 'Brie Larson', 'Paul Rudd'],
        release: 2023,
        lang: ['Hindi', 'English', 'Bengali', 'Telugu', 'Tamil'],
        genre: ['Action', 'Adventure', 'Fiction', 'Superhero', 'Thriller'],
        rating: {imdb: 9, flixify: 3.6},
        trailers : [
            {
                thum: Imgurl,
                url : '',
                mm: 2,
                ss: 30
            },
            {
                thum: Imgurl,
                url : '',
                mm: 5,
                ss: 30
            }
        ]
    }
  return(
    <div className="MoviePage_">
        <div className="topbar">
            <div className="movtitle">{data.title}</div>
            <div className="watchlist_button">
                <FaPlus />
                <div>Watchlist</div>
            </div>
        </div>
        <div className="central">
            <div className="content">
                <HeadnTxt heading='Description' data={[data.description]} />
                <HeadnTxt heading='Director' data={data.director} />
                <HeadnTxt heading='Cast' data={data.cast} />
                <Headline heading='Trailers' />
                <ArrangeComp dir="row" dat_arr={data.trailers} Component={TrailerCard} />
            </div>
            <div className="content rightc">
                <HeadnTxt heading='Release_Year' data={[data.release]} />
                <Headline heading='Language' />
                <ArrangeComp dir="row" dat_arr={data.lang} Component={LangGen} />
                <Headline heading='Genres' />
                <ArrangeComp dir="row" dat_arr={data.genre} Component={LangGen} />
                <Headline heading='Ratings' />
                <ArrangeComp dir="column" dat_arr={transformRatingObject(data.rating)} Component={Rating} />
            </div>
        </div>
    </div>
  )
}

export default MoviePage_;