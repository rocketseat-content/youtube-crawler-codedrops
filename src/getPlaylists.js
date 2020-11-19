module.exports = async function (page, url) {
  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  return await page.evaluate(() => {
    const elements = document.querySelectorAll(
      "ytd-grid-playlist-renderer"
    );

    return [...elements].map(playlistElement => {
      return {
        url: playlistElement.querySelector('.yt-formatted-string').href,
        title: playlistElement.querySelector('h3 a').innerHTML,
      }
    });
  });
};
