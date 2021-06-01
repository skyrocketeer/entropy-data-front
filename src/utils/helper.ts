export const parseTokenFromUrl = (url: string) => {
  const regex = new RegExp('[\\?&]' + 'token' + '=([^&#]*)');
  const results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const isBrowserCheck = () => typeof window !== 'undefined'
export const isClient = isBrowserCheck()