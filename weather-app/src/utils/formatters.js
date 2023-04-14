import moment from 'moment'

// export const getDayDateMonth = (val) => moment(val).format('dddd Do MMMM')

const getDay = (val) => moment(val).format('dddd')
const getDate = (val) => moment(val).format('Do')
const getMonth = (val) => moment(val).format('MMMM')
export const getDayDateMonth = (val) =>
  `${getDay(val)}, ${getDate(val)} ${getMonth(val)}`
