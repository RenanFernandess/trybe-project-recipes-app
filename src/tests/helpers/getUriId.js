export default function getUrlId(url) { return url.match(/\d+/g).slice(-1)[0]; }
