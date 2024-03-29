import "./index.css"

const Headline = ({heading}) => {
  return(
    <div className="row_ heading">
        <div className="htxt_">{heading}</div>
        <div className="line_"></div>
    </div>
  )
}

const TextComp = ({data}) => {
  return(
    <div className="row_">
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        director: ['Anthony Russo', 'Joe Russo'],
        cast: [],
        trailer: [],
        release: 2023,
        lang: ['Hindi', 'English', 'Bengali'],
        genre: [],
        rating: {imdb: 9.5, flixify: 4.2}
    }
  return(
    <div className="MoviePage_">
        <Headline heading='Director' />
        <TextComp data={data.director} />
        <ArrangeComp dir="row" dat_arr={data.lang} Component={LangGen} />
    </div>
  )
}

export default MoviePage;