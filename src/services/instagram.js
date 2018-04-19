'use strict'

const { get } = require('lodash')
const { JSDOM } = require('jsdom')
const got = require('got')

const AVATAR_URL = {
  normal:
    '_sharedData.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd',
  bigger: '_sharedData.entry_data.ProfilePage[0].graphql.user.profile_pic_url'
}

module.exports = async username => {
  const { body } = await got(`https://www.instagram.com/${username}`)
  const { window } = new JSDOM(body, { runScripts: 'dangerously' })
  return get(window, AVATAR_URL.bigger) || get(window, AVATAR_URL.normal)
}

module.exports.supported = {
  email: false,
  username: true
}
