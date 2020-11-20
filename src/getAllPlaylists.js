export async function getAllPlaylists(page, url) {
  await page.goto(url, {
    // linux, darwin
    // waitUntil: 'networkidle2'
    // win32
    waitUntil: 'networkidle0',
  });

  return await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    const elements = document.querySelectorAll('ytd-grid-playlist-renderer');

    return [...elements].map((playlistElement) => {
      return {
        url: playlistElement.querySelector('.yt-formatted-string').href,
        title: playlistElement.querySelector('h3 a').innerHTML,
      };
    });
  });
}
