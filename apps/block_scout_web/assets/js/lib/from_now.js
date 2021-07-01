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
  $container.find('[data-text-translate]').each((i, el) => tryUpdateText(el))
  // $container.find('[data-text-test]').each((i, el) => test(el))
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

      if(fromNowStr.includes("a second ago"))
        translateTimeUnitStr = fromNowStr.replace("a second ago", "1 วินาทีที่แล้ว")
      else if(fromNowStr.includes("a few seconds ago"))
        translateTimeUnitStr = fromNowStr.replace("a few seconds ago", "ไม่กี่วินาทีที่แล้ว")
      else if(fromNowStr.includes("seconds ago"))
        translateTimeUnitStr = fromNowStr.replace("seconds ago", "วินาทีที่แล้ว")

      else if(fromNowStr.includes("a minute ago"))
        translateTimeUnitStr = fromNowStr.replace("a minute ago", "1 นาทีที่แล้ว")
      else if(fromNowStr.includes("a few minutes ago"))
        translateTimeUnitStr = fromNowStr.replace("a few minutes ago", "ไม่กี่นาทีที่แล้ว")
      else if(fromNowStr.includes("minutes ago"))
        translateTimeUnitStr = fromNowStr.replace("minutes ago", "นาทีที่แล้ว")

      else if(fromNowStr.includes("an hour ago"))
        translateTimeUnitStr = fromNowStr.replace("an hour ago", "1 ชั่วโมงที่แล้ว")
      else if(fromNowStr.includes("a few hours ago"))
        translateTimeUnitStr = fromNowStr.replace("a few hours ago", "ไม่กี่ชั่วโมงที่แล้ว")
      else if(fromNowStr.includes("hours ago"))
        translateTimeUnitStr = fromNowStr.replace("hours ago", "ชั่วโมงที่แล้ว")

      else if(fromNowStr.includes("a day ago"))
        translateTimeUnitStr = fromNowStr.replace("a day ago", "1 วันที่แล้ว")
      else if(fromNowStr.includes("a few days ago"))
        translateTimeUnitStr = fromNowStr.replace("a few days ago", "ไม่กี่วันที่แล้ว")
      else if(fromNowStr.includes("days ago"))
        translateTimeUnitStr = fromNowStr.replace("days ago", "วันที่แล้ว")

      else if(fromNowStr.includes("a week ago"))
        translateTimeUnitStr = fromNowStr.replace("a week ago", "1 สัปดาห์ที่แล้ว")
      else if(fromNowStr.includes("a few weeks ago"))
        translateTimeUnitStr = fromNowStr.replace("a few weeks ago", "ไม่กี่สัปดาห์แล้ว")
      else if(fromNowStr.includes("weeks ago"))
        translateTimeUnitStr = fromNowStr.replace("weeks ago", "สัปดาห์ที่แล้ว")

      else if(fromNowStr.includes("a month ago"))
        translateTimeUnitStr = fromNowStr.replace("a month ago", "1 เดือนที่แล้ว")
      else if(fromNowStr.includes("a few months ago"))
        translateTimeUnitStr = fromNowStr.replace("a few months ago", "ไม่กี่เดือนที่แล้ว")
      else if(fromNowStr.includes("months ago"))
        translateTimeUnitStr = fromNowStr.replace("months ago", "เดือนที่แล้ว")

      else if(fromNowStr.includes("a year ago"))
        translateTimeUnitStr = fromNowStr.replace("a year ago", "1 ปีที่แล้ว")
      else if(fromNowStr.includes("a few years ago"))
        translateTimeUnitStr = fromNowStr.replace("a few years ago", "ไม่กี่ปีที่แล้ว")
      else if(fromNowStr.includes("years ago"))
        translateTimeUnitStr = fromNowStr.replace("years ago", "ปีที่แล้ว")

      el.innerHTML = translateTimeUnitStr
    }
    else {
      el.innerHTML = fromNow
    }
  }
}

function tryUpdateText (el) {
  if(getLocale === "th") {
    let innerText = el.innerHTML
    let translateStr = el.innerHTML

    // Formatted Status
    if(innerText.includes("Pending"))
      translateStr = innerText.replace("Pending", "รอดำเนินการ")
    else if(innerText.includes("Success"))
      translateStr = innerText.replace("Success", "สำเร็จ")
    else if(innerText.includes("Error: (Awaiting internal transactions for reason)"))
      translateStr = innerText.replace("Error: (Awaiting internal transactions for reason)", "ข้อผิดพลาด: (กำลังรอการทำธุรกรรม)")
    else if(innerText.includes("(Awaiting internal transactions for status)"))
      translateStr = innerText.replace("(Awaiting internal transactions for status)", "(กำลังรอการทำธุรกรรม)")
    else if(innerText.includes("Error"))
      translateStr = innerText.replace("Error", "ข้อผิดพลาด")

    // Transaction/Transaction Display Type
    else if(innerText.includes("Transactions"))
      translateStr = innerText.replace("Transactions", "การทำธุรกรรม")
    else if(innerText.includes("Transaction"))
      translateStr = innerText.replace("Transaction", "การทำธุรกรรม")

    // Validator
    else if(innerText.includes("Validator"))
      translateStr = innerText.replace("Validator", "ผู้ตรวจสอบ")

    // Transaction Display Type
    else if(innerText.includes("Contract Creation"))
      translateStr = innerText.replace("Contract Creation", "การสร้างสัญญา")
    else if(innerText.includes("Contract Call"))
      translateStr = innerText.replace("Contract Call", "การเรียกใช้สัญญา")

    // Block Number
    else if(innerText.includes("Block "))
      translateStr = innerText.replace("Block ", "บล็อก ")

    // Bytes
    else if(innerText.includes("bytes"))
      translateStr = innerText.replace("bytes", "ไบต์")

    // Gas
    else if(innerText.includes(" Gas Limit"))
    {
      let arrStr = innerText.split(' ')
      if(arrStr.length == 3)
      {
        translateStr = "แก๊สสูงสุด " + arrStr[0];
      }
    }
    else if(innerText.includes(" Gas Used"))
      translateStr = innerText.replace(" Gas Used", " แก๊สที่ใช้จริง")

    // Balance
    else if(innerText.includes("Error trying to fetch balances."))
      translateStr = innerText.replace("Error trying to fetch balances.", "การเรียกดูยอดรวมผิดพลาด")
    else if(innerText.includes("Balance"))
      translateStr = innerText.replace("Balance", "ยอดรวม")
    else if(innerText.includes("Fetching tokens..."))
      translateStr = innerText.replace("Fetching tokens...", "กำลังเรียกดูโทเคน...")

    // Transaction Type
    else if(innerText.includes("OUT"))
      translateStr = innerText.replace("OUT", "ส่งออก")
    else if(innerText.includes("IN"))
      translateStr = innerText.replace("IN", "รับเข้า")
    
    el.innerHTML = translateStr
  }
}

// function test (el) {
//   if(getLocale === "th") {
//     let innerText = el.innerHTML
//     let translateStr = el.innerHTML

//     console.log(innerText)
//     if(innerText.includes(" Gas Limit"))
//     {
//       let arrStr = innerText.split(' ')
//       if(arrStr.length == 3)
//       {
//         translateStr = "แก๊สสูงสุด " + arrStr[0] + " นะจ๊ะ";
//         console.log(translateStr)
//       }
//     }

//     el.innerHTML = translateStr
//   }
// }

updateAllAges()

setInterval(updateAllAges, 500)
