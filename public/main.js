const times = areas =>
 areas.map(({zone}) => ({
    zone: zone.split('/')[1].replace('_', ' '),
    time: moment()
      .tz(zone)
      .format('hh:mm:ss a')
  }))

const render = time =>
  (($time, $value) => {
    $time.classList.add('time')
    $value.textContent = `${time.zone} ${time.time}`
    $value.classList.add('value')
    return $time.appendChild($value).parentNode
  })(document.createElement('div'), document.createElement('div'))

const timezones = () => {
  return fetch('http://localhost:3000/timezones').then(res => res.json())
}


const tick = () => {
  const zones = timezones()
  setInterval(() => {
    zones
      .then(times)
      .then(data => data.map(render))
      .then(data => {
        document.querySelector('.times').innerHTML = ''
        data.forEach(element => {
          document.querySelector('.times').appendChild(element)
        })
      })
}, 16)
}

tick()
