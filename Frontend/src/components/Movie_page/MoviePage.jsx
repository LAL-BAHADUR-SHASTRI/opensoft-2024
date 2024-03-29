import { FaRegStar, FaStar, FaStarHalfAlt, FaStarHalf, FaPlus } from "react-icons/fa"
import "./index.css"
import imdb from '../../assets/imdb.svg'
import flixify from '../../assets/logo.svg'

const Headline = ({heading}) => {
  return(
    <div className="row heading">
        <div className="htxt_">{heading}</div>
        <div className="line_"></div>
    </div>
  )
}

const TextComp = ({data}) => {
  return(
    <div className="row">
        {data.map((str, index) => (
        <p key={index} className="txt_">
          {str}&nbsp;&nbsp;{index < data.length - 1 ? '|' : ''}&nbsp;&nbsp;
        </p>
      ))}
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

const ArrangeComp = ({dat_arr, Component, dir}) => {
    return (
        <div className={dir}>
            {dat_arr.map((item, index) => (
            <Component key={index} data={item} />
        ))}
        </div>
    )
}

const MoviePage = (props) => {
    let data = {
        title: "Avengers: Endgame",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        director: ['Anthony Russo', 'Joe Russo'],
        cast: [],
        trailer: [],
        release: 2023,
        lang: ['Hindi', 'English', 'Bengali'],
        genre: [],
        rating: {imdb: 9, flixify: 3.6}
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
        <Headline heading='Director' />
        <TextComp data={data.director} />
        <ArrangeComp dir="row" dat_arr={data.lang} Component={LangGen} />
        <ArrangeComp dir="column" dat_arr={transformRatingObject(data.rating)} Component={Rating} />
    </div>
  )
}

export default MoviePage;