const formatNumber = (value) => {
  return value ? parseFloat(value).toLocaleString('en-US') : '0';
};

const parseNumber = (value) => {
  return (parseFloat(value.replace(/,/g, '')) || 0).toString();
};


export {
  formatNumber,
  parseNumber,
}