import { imgurl_P } from "@/constants/themes";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function calcDur(val) {
  // let val =  item?.runtime || data.runtime;
  let dur = '';
  if (val >= 60) {
    dur += Math.round((val/60)-0.5).toString();
    dur += ' hr '
  }
  dur += (val%60).toString();
  dur += ' min'
  return dur;
}

export function genRand(min, max) {
  return Math.floor(Math.random()
      * (max - min + 1)) + min;
};

export function getRandImg() {
  let t = genRand(0,9);
  return imgurl_P[t];
}