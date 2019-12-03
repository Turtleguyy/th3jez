import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'

export default Route.extend({
  model() {

    // twitch
    const client    = '69l6o7bwqkhjudkhdu8fl76vo1hz5d'
    // const twitchURL = 'https://api.twitch.tv/helix/users?login=th3jez'
    const twitchURL = 'https://api.twitch.tv/helix/users/follows?to_id=64338466'

    // youtube
    const base = 'https://www.googleapis.com/youtube/v3/channels'
    const part = 'statistics'
    const id   = 'UCAsrdlefrZyvnELIXLMZkNg'
    const key  = 'AIzaSyAI0vmtA7KwQpzbR14kt9AAf1_3c7he1BI'
    const youtubeURL = `${base}?part=${part}&id=${id}&key=${key}`

    return RSVP.hash({
      twitch: fetch(twitchURL, { headers: { 'Client-ID': `${client}` }})
      .then(response => response.json())
      .then(data => data.total),

      youtube: fetch(youtubeURL)
        .then(response => response.json())
        .then(data => {
          if (data.items.length) return data.items[0].statistics.subscriberCount
        })
    })
  }
})
