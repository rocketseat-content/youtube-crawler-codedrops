import puppeteer from 'puppeteer-core';
import os from 'os';

import { getVideosTime } from './getVideosTime.js';
import { getAllPlaylists } from './getAllPlaylists.js';
import { getFormattedTime } from './getFormattedTime.js';

const executablePaths = {
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  win32: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
};

const platform = os.platform();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform],
  });

  const page = await browser.newPage();

  const playlists = await getAllPlaylists(
    page,
    'https://www.youtube.com/c/RocketSeat/playlists'
  );
  const playlistsTimes = [];

  for (const playlist of playlists) {
    const time = await getVideosTime(page, playlist.url);

    playlistsTimes.push({ time, ...playlist });

    // console.log(playlistsTimes);
    console.log(`${playlist.title}: ${getFormattedTime(time)}`);
  }

  function sumTimes(previous, current) {
    if (previous !== undefined) {
      previous = { time: previous };
      return previous.time + current.time;
    }
  }
  let times = playlistsTimes.reduce(sumTimes, 0);

  console.log(`Produzimos ${getFormattedTime(times)} de conteúdo Gratuito`);

  await browser.close();
})();

// 84304+49091+18651+57438+32354+85392+30560+40259+4238+53122+58919+24774+415+4267+3985+39787+6502+10389+20949+2627+2111+36678+6429+1427+630
