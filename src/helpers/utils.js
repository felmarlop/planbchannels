export function isVideo(channel) {
  return ['.mkv', '.mp4'].some(f => channel.link.includes(f))
}
export function getFileData(f, cb) {
  if (!f) {
    return cb([])
  }
  const reader = new FileReader()
  let channels = []
  reader.onload = e => {
    const text = e.target.result
    const lines = text.split('\n')
    const len = lines.length
    let link = null
    let group = null
    let img = null
    let name = null
    for (var i = 0; i < len; i++) {
      if (lines[i].includes('#EXTINF') && i != len - 1) {
        link = lines[i + 1]
      } else {
        continue
      }
      // Get name
      name = lines[i].split(',')
      if (name.length > 1) {
        name = name[name.length - 1]
      } else {
        name = 'Nombre no disponible'
      }
      // Get img
      img = lines[i].split('logo="')
      if (img.length > 1) {
        img = img[1].split('"')[0]
      } else {
        img = null
      }
      // Get group
      group = lines[i].split('group-title="')
      if (group.length > 1) {
        group = group[1].split('"')[0].split(';')[0]
        if (['undefined', 'not defined'].indexOf(group.toLowerCase()) >= 0) {
          group = 'Otros'
        }
      } else {
        group = 'Otros'
      }
      channels.push({
        group: group,
        img: img,
        link: link,
        name: name
      })
    }
    channels.sort((a, b) => {
      return a.name < b.name
    })
    return cb(channels)
  }
  reader.readAsText(f)
}
