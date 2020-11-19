const puppeteer = require('puppeteer-core');
const os = require('os');
const getVideosTime = require('./getVideosTime');
const getPlaylists = require('./getPlaylists');

function getFormattedTime([hours, minutes, seconds]) {
  const minutesFromSeconds = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes += minutesFromSeconds;

  const hoursFromMinutes = Math.floor(minutes / 60);

  minutes = minutes % 60;
  hours += hoursFromMinutes;  

  return `${hours}:${minutes}:${seconds}`; 
}

const executablePaths = {
  'linux': '/usr/bin/google-chrome',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
};

const platform = os.platform();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform]
  });

  const page = await browser.newPage();

  const playlists = await getPlaylists(page, 'https://www.youtube.com/c/RocketSeat/playlists');
  const playlistsTimes = [];

  for (const playlist of playlists) {
    const time = await getVideosTime(page, playlist.url);
    

    playlistsTimes.push({
      time,
      ...playlist
    });

    console.log(playlist.title + ": " + getFormattedTime(time));
  }

  const times = playlistsTimes.reduce((acc, { time }) => {
    return [acc[0] + time[0], acc[1] + time[1], acc[2] + time[2]]; 
  }, [0, 0, 0]);

  console.log(
    `Produzimos ${getFormattedTime(times)} de conteúdo`
  );
  
  await browser.close();
})();
