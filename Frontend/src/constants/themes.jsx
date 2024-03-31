export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const Imgurl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8uK1L5G7UwQfdiartTL4sg-QtDgo8wsUBnRZ6V9foaCBlTOd8NZQyexTr0xiPsZlpKKJkrCfTtRhTD8gcfHwxNGrKSgi2bqwaiKpolFVr3chDgkRtVKL_fNwHScrKfEiZhYlCO9_FEu_m/w1920-h1080-c/avengers-endgame-uhdpaper.com-8K-94.jpg;' 
export const Img2url = 'https://rukminim2.flixcart.com/image/850/1000/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=90&crop=false'
export const imgurl_P = [
  'https://rukminim2.flixcart.com/image/850/1000/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=90&crop=false',
  'https://m.media-amazon.com/images/I/91zTlD7AY1L.jpg',
  'https://hippy.in/wp-content/uploads/2012/11/custom-made-hollywood-movie-posters-2.jpg',
  'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/c/b/d/small-pathan-shah-rukh-khan-bollywood-hindi-movie-poster-small-original-imagmt3dgxh7avyg.jpeg?q=20&crop=false',
  'https://i.etsystatic.com/36318431/r/il/8237c4/4473777989/il_570xN.4473777989_qa2j.jpg',
  'https://m.media-amazon.com/images/I/5161KW51G2L._AC_UF1000,1000_QL80_.jpg',
  'https://rukminim2.flixcart.com/image/850/1000/k0h12fk0/poster/g/3/t/medium-joker-movie-poster-for-room-office-13-inch-x-19-inch-original-imafk9kg4hczamuz.jpeg?q=20&crop=false',
  'https://img.moviepostershop.com/hypnotic-movie-poster-2023-1000782336.jpg',
  'https://www.designmantic.com/blog/wp-content/uploads/2017/10/Harry-Potter.jpg',
  'https://i0.wp.com/www.indesignskills.com/wp-content/uploads/2022/06/The-Batman-2.jpg?resize=850%2C1259&ssl=1'
]

export const SQLDATETOSTRING = (date) => {
  if (
    date === null ||
    date === undefined ||
    date === '' ||
    date === 'null' ||
    date === 'undefined'
  ) {
    return { date: '-', time: '-' };
  }
  let t = [];
  t = date.split(/[- :]/);
  return { date: `${t[0]} ${Months[t[1] - 1]} ${t[2]}`, time: `${t[3]}:${t[4]}` };
};

export const COLORS = {
  white :'rgba(255, 255, 255, 1)',
  offwhite: 'rgba(153, 153, 153, 1)',
  yellow: 'rgba(270, 171, 0, 1)',
  lightBlack: 'rgba(20,20,20,1)',
}
