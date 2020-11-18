module.exports = async function(page, url) {
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  
  return page.evaluate(() => {
    const videos = document.querySelectorAll('.ytd-playlist-video-list-renderer span.ytd-thumbnail-overlay-time-status-renderer')
    
    let hours = 0, minutes = 0, seconds = 0;
    
    videos.forEach(video => {
      const fullTime = video.innerHTML.split(':')
      
      if (fullTime.length > 2) {
        hours += Number(fullTime[0])
        minutes += Number(fullTime[1])
        seconds += Number(fullTime[2])
      } else {
        minutes += Number(fullTime[0])
        seconds += Number(fullTime[1])
      }
    })
  
    const fullTimeInSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;

    return fullTimeInSeconds;
  });
}