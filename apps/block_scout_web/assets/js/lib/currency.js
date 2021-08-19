import $, { data } from 'jquery'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'

export function formatUsdValue (value) {
  // return `${formatCurrencyValue(value)} USD`
  console.log('calling API...');
  let usdtLast = callMarketTickerAPI();
  if(usdtLast){
    return `${formatCurrencyValueTHB(value*usdtLast)} THB`
  }
  else{
    return `${formatCurrencyValue(value)} USD`
  }
}

function formatTokenUsdValue (value) {
  return formatCurrencyValue(value, '@')
}

function formatCurrencyValue (value, symbol) {
  symbol = symbol || '$'
  if (value === 0) return `${symbol}0.000000`
  if (value < 0.000001) return `${window.localized['Less than']} ${symbol}0.000001`
  if (value < 1) return `${symbol}${numeral(value).format('0.000000')}`
  if (value < 100000) return `${symbol}${numeral(value).format('0,0.00')}`
  if (value > 1000000000000) return `${symbol}${numeral(value).format('0.000e+0')}`
  return `${symbol}${numeral(value).format('0,0')}`
}

function formatCurrencyValueTHB (value) {
  if (value === 0) return `0.000000`
  if (value < 0.000001) return `${window.localized['Less than']} 0.000001`
  if (value < 1) return `${numeral(value).format('0.000000')}`
  if (value < 100000) return `${numeral(value).format('0,0.00')}`
  if (value > 1000000000000) return `${numeral(value).format('0.000e+0')}`
  return `${numeral(value).format('0,0')}`
}

function weiToEther (wei) {
  return new BigNumber(wei).dividedBy('1000000000000000000').toNumber()
}

function etherToUSD (ether, usdExchangeRate) {
  return new BigNumber(ether).multipliedBy(usdExchangeRate).toNumber()
}

export function formatAllUsdValues (root) {
  root = root || $(':root')

  root.find('[data-usd-value]').each((i, el) => {
    el.innerHTML = formatUsdValue(el.dataset.usdValue)
  })
  root.find('[data-token-usd-value]').each((i, el) => {
    el.innerHTML = formatTokenUsdValue(el.dataset.tokenUsdValue)
  })

  return root
}
formatAllUsdValues()

function tryUpdateCalculatedUsdValues (el, usdExchangeRate = el.dataset.usdExchangeRate) {
  // eslint-disable-next-line no-prototype-builtins
  if (!el.dataset.hasOwnProperty('weiValue')) return
  const ether = weiToEther(el.dataset.weiValue)
  const usd = etherToUSD(ether, usdExchangeRate)
  const formattedUsd = formatUsdValue(usd)
  if (formattedUsd !== el.innerHTML) el.innerHTML = formattedUsd
}

function tryUpdateUnitPriceValues (el, usdUnitPrice = el.dataset.usdUnitPrice) {
  const formattedValue = formatCurrencyValue(usdUnitPrice)
  if (formattedValue !== el.innerHTML) el.innerHTML = formattedValue
}

export function updateAllCalculatedUsdValues (usdExchangeRate) {
  $('[data-usd-exchange-rate]').each((i, el) => tryUpdateCalculatedUsdValues(el, usdExchangeRate))
  $('[data-usd-unit-price]').each((i, el) => tryUpdateUnitPriceValues(el, usdExchangeRate))
}

updateAllCalculatedUsdValues();

function callMarketTickerAPI() {
  let request = new XMLHttpRequest()
  request.open('GET', 'https://api.bitkub.com/api/market/ticker', true);
  request.onload = function () {
    let data = JSON.parse(this.response);
    if(data){
      console.log(data.THB_USDT.last);
      return data.THB_USDT.last;
    }
  }
  request.send();
}