import API from './api'

class _amateurSong extends API {
  constructor() {
    super()
    this.path = '/no-hit-songs/'
  }
}

class _hitSong extends API {
  constructor() {
    super()
    this.path = '/hit-songs/'
  }
}

class _retroSong extends API {
  constructor() {
    super()
    this.path = '/retro-songs/'
  }
}

const AmateurSong = new _amateurSong()
const HitSong = new _hitSong()
const RetroSong = new _retroSong()

export { AmateurSong, HitSong, RetroSong }
