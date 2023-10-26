import './style.css';
import * as classes from './objects';
import * as render from './render';

let dateFns = require('date-fns');
const AriDay = new Date('1979/06/19');
const formattedDate1 = dateFns.format(AriDay, 'dd/MM/yyyy');
const formattedDate2 = dateFns.format(AriDay, 'dd,MMMM, yyyy');

console.log(AriDay);
console.log(formattedDate1);
console.log(formattedDate2);
