import Cookies from 'universal-cookie'
const cookies = new Cookies()

export function getCookie (name) {
  return cookies.get(name)
}
