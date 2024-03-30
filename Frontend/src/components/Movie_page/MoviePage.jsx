import { FaRegStar, FaStar, FaStarHalfAlt, FaPlus } from "react-icons/fa"
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

const HeadnTxt = ({heading, data}) => {
    return (
        <div className="headnTxt">
            <Headline heading={heading} />
            <TextComp data={data} />
        </div>
    )
}

const MoviePage = (props) => {
    let data = {
        title: "Avengers: Endgame",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        director: ['Anthony Russo', 'Joe Russo'],
        cast: ['Robert Downey Jr.', 'Scarlett Johannson', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo', 'Jeremy Ranner', 'Brie Larson', 'Paul Rudd'],
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
        <div className="central">
            <div className="content">
                <HeadnTxt heading='Description' data={[data.description]} />
                <HeadnTxt heading='Director' data={data.director} />
                <HeadnTxt heading='Cast' data={data.cast} />
                <Headline heading='Trailers' />
            </div>
            <div className="content rightc">

            </div>
        </div>
        <TextComp data={data.director} />
        <ArrangeComp dir="row" dat_arr={data.lang} Component={LangGen} />
        <ArrangeComp dir="column" dat_arr={transformRatingObject(data.rating)} Component={Rating} />
    </div>
  )
}

export default MoviePage;