import $, { data } from 'jquery'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'

let usdtValue = 33;

export function formatUsdValue (value) {
  // console.log("formatUsdValue : ", value);
  console.log("formatUsdValueToTHB : ", value , "*", usdtValue, " = ", value*usdtValue);
  // return `${formatCurrencyValue(value)} USD`
  return `${formatCurrencyValueTHB(value*usdtValue)} THB`
}

function formatTokenUsdValue (value) {
  // console.log("formatTokenUsdValue : ", value);
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

function asyncCall() {
  setInterval(function(){
    // fetchAsync();
    console.log('calling API...');
    usdtValue = 30 + Math.floor(Math.random() * 3); // Mock up data 
  }, 20000); // 20 sec
}

async function fetchAsync () {
  let response = await fetch('https://api.bitkub.com/api/market/ticker');
  let data = await response.json();
  console.log("fetchAsync : ", data);
  return data;
}

asyncCall();
