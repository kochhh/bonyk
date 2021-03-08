export default function currencyFilter(value, currency = 'UAH') {
  return new Intl.NumberFormat('uk-UA', {
    currency,
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0
  }).format(value)
}
