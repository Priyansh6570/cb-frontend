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
        const decimalIndex = remainderInWords.indexOf('.');
        const formattedRemainder = decimalIndex !== -1 ? remainderInWords.substring(0, decimalIndex) : remainderInWords;
        return `${quotient}.${formattedRemainder} ${words[i]}`;
      }
    }
  }

  return number.toLocaleString('en-IN', { useGrouping: false });
}

export default NumberWithCommas;
