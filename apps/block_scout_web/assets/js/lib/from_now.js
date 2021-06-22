import $ from 'jquery'
import moment from 'moment'

moment.relativeTimeThreshold('M', 12)
moment.relativeTimeThreshold('d', 30)
moment.relativeTimeThreshold('h', 24)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

export function updateAllAges ($container = $(document)) {
  $container.find('[data-from-now]').each((i, el) => tryUpdateAge(el))
  return $container
}
function tryUpdateAge (el) {
  if (!el.dataset.fromNow) return

  const timestamp = moment(el.dataset.fromNow)
  if (timestamp.isValid()) updateAge(el, timestamp)
}
function updateAge (el, timestamp) {
  let fromNow = timestamp.fromNow()
  // show the exact time only for transaction details page. Otherwise, short entry
  const elInTile = el.hasAttribute('in-tile')
  if ((window.location.pathname.includes('/tx/') || window.location.pathname.includes('/blocks/')) && !elInTile) {
    const offset = moment().utcOffset() / 60
    const sign = offset && Math.sign(offset) ? '+' : '-'
    const formatDate = `MMMM-DD-YYYY hh:mm:ss A ${sign}${offset} UTC`
    fromNow = `${fromNow} (${timestamp.format(formatDate)})`
  }
  if (fromNow !== el.innerHTML) {
    
    if(getLocale === "th") {
      let fromNowStr = fromNow
      let translateTimeUnitStr = fromNow

      if(fromNowStr.endsWith("a second ago"))
        translateTimeUnitStr = fromNowStr.replace("a second ago", "1 วินาทีที่แล้ว")
      else if(fromNowStr.endsWith("a few seconds ago"))
        translateTimeUnitStr = fromNowStr.replace("a few seconds ago", "ไม่กี่วินาทีที่แล้ว")
      else if(fromNowStr.endsWith("seconds ago"))
        translateTimeUnitStr = fromNowStr.replace("seconds ago", "วินาทีที่แล้ว")

      else if(fromNowStr.endsWith("a minute ago"))
        translateTimeUnitStr = fromNowStr.replace("a minute ago", "1 นาทีที่แล้ว")
      else if(fromNowStr.endsWith("a few minutes ago"))
        translateTimeUnitStr = fromNowStr.replace("a few minutes ago", "ไม่กี่นาทีที่แล้ว")
      else if(fromNowStr.endsWith("minutes ago"))
        translateTimeUnitStr = fromNowStr.replace("minutes ago", "นาทีที่แล้ว")

      else if(fromNowStr.endsWith("an hour ago"))
        translateTimeUnitStr = fromNowStr.replace("an hour ago", "1 ชั่วโมงที่แล้ว")
      else if(fromNowStr.endsWith("a few hours ago"))
        translateTimeUnitStr = fromNowStr.replace("a few hours ago", "ไม่กี่ชั่วโมงที่แล้ว")
      else if(fromNowStr.endsWith("hours ago"))
        translateTimeUnitStr = fromNowStr.replace("hours ago", "ชั่วโมงที่แล้ว")

      else if(fromNowStr.endsWith("a day ago"))
        translateTimeUnitStr = fromNowStr.replace("a day ago", "1 วันที่แล้ว")
      else if(fromNowStr.endsWith("a few days ago"))
        translateTimeUnitStr = fromNowStr.replace("a few days ago", "ไม่กี่วันที่แล้ว")
      else if(fromNowStr.endsWith("days ago"))
        translateTimeUnitStr = fromNowStr.replace("days ago", "วันที่แล้ว")

      else if(fromNowStr.endsWith("a week ago"))
        translateTimeUnitStr = fromNowStr.replace("a week ago", "1 สัปดาห์ที่แล้ว")
      else if(fromNowStr.endsWith("a few weeks ago"))
        translateTimeUnitStr = fromNowStr.replace("a few weeks ago", "ไม่กี่สัปดาห์แล้ว")
      else if(fromNowStr.endsWith("weeks ago"))
        translateTimeUnitStr = fromNowStr.replace("weeks ago", "สัปดาห์ที่แล้ว")

      else if(fromNowStr.endsWith("a month ago"))
        translateTimeUnitStr = fromNowStr.replace("a month ago", "1 เดือนที่แล้ว")
      else if(fromNowStr.endsWith("a few months ago"))
        translateTimeUnitStr = fromNowStr.replace("a few months ago", "ไม่กี่เดือนที่แล้ว")
      else if(fromNowStr.endsWith("months ago"))
        translateTimeUnitStr = fromNowStr.replace("months ago", "เดือนที่แล้ว")

      else if(fromNowStr.endsWith("a year ago"))
        translateTimeUnitStr = fromNowStr.replace("a year ago", "1 ปีที่แล้ว")
      else if(fromNowStr.endsWith("a few years ago"))
        translateTimeUnitStr = fromNowStr.replace("a few years ago", "ไม่กี่ปีที่แล้ว")
      else if(fromNowStr.endsWith("years ago"))
        translateTimeUnitStr = fromNowStr.replace("years ago", "ปีที่แล้ว")

      el.innerHTML = translateTimeUnitStr
    }
    else {
      el.innerHTML = fromNow
    }

  }
}
updateAllAges()

setInterval(updateAllAges, 1000)
