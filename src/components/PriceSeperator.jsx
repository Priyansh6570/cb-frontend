// function NumberWithCommas(x) {
//     x=x.toString();
//       var lastThree = x.substring(x.length-3);
//       var otherNumbers = x.substring(0,x.length-3);
//       if(otherNumbers != '')
//           lastThree = ',' + lastThree;
//       var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
//     return res;
//   }
//   export default NumberWithCommas;

function NumberWithCommas(number) {
  const map = {
    Lakh: 100000,
    Crore: 10000000
  };

  const words = Object.keys(map).reverse();

  for (let i = 0; i < words.length; i++) {
    const divider = map[words[i]];

    if (number >= divider) {
      const quotient = Math.floor(number / divider);
      const remainder = number % divider;

      if (remainder === 0) {
        return `${quotient} ${words[i]}`;
      } else if (remainder % 1000 === 0) {
        return `${quotient}.${remainder / 1000} ${words[i]}`;
      } else {
        const remainderInWords = NumberWithCommas(remainder);
        return `${quotient}.${remainderInWords} ${words[i]}`;
      }
    }
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default NumberWithCommas;



