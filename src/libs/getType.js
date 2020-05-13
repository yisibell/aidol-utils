export default function getType(_val){
  let s = Object.prototype.toString.call(_val)
  return s.slice( s.indexOf(' ') + 1 , s.length - 1 )
}