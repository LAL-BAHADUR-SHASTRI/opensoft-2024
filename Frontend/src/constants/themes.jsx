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
