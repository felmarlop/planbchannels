import axios from 'axios'

// Check if the URL is a video with the following formats
export function isStreaming(channel) {
  return !['.avi', '.mkv', '.mp4', '.mpeg', '.ogv', '.webm', '.3gp', '.3g2'].some(f => channel.link.includes(f))
}
// Get channels from a file
export function getFileData(f, cb) {
  if (!f) {
    return cb([])
  }
  const reader = new FileReader()
  reader.onload = e => {
    return cb(_getChannelsFromText(e.target.result))
  }
  reader.readAsText(f)
}
// Retrieve channels from a M3U url
export function getURLData(uri, cb) {
  if (!uri) {
    return cb([])
  }
  axios
    .get(uri)
    .then(r => {
      cb(_getChannelsFromText(r.data || ''))
    })
    .catch(() => {
      cb([])
    })
}

function _getChannelsFromText(text) {
  const lines = text.split('\n')
  const len = lines.length
  let line = null
  let link = null
  let channels = []
  for (var i = 0; i < len; i++) {
    line = lines[i]
    if (line.includes('#EXTINF') && i != len - 1) {
      link = lines[i + 1]
    } else {
      continue
    }
    try {
      channels.push({
        group: _getGroupFromLine(line),
        img: _getImageLinkFromLine(line),
        link: link,
        name: _getNameFromLine(line)
      })
    } catch {
      continue
    }
  }
  channels.sort((a, b) => {
    return a.name < b.name
  })
  return channels
}

function _getNameFromLine(line) {
  let splits = line.split(',')
  if (splits.length > 1) {
    return splits[splits.length - 1]
  }
  splits = line.split('tvg-name="')
  if (splits.length > 1) {
    return splits[1].split('"')[0]
  }
  return 'Nombre no disponible'
}

function _getImageLinkFromLine(line) {
  let splits = line.split('logo="')
  if (splits.length > 1) {
    return splits[1].split('"')[0]
  }
  return null
}

function _getGroupFromLine(line) {
  let splits = line.split('group-title="')
  if (splits.length > 1) {
    splits = splits[1].split('"')[0].split(';')[0]
    if (['undefined', 'not defined'].indexOf(splits.toLowerCase()) >= 0) {
      return 'Otros'
    }
    return splits
  } else {
    return 'Otros'
  }
}
