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
  offwhite: 'rgba(153, 153, 153, 1)'
}
