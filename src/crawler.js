import puppeteer from 'puppeteer-core';
import os from 'os';

import { getVideosTime } from './getVideosTime.js';

const executablePaths = {
  'linux': '/usr/bin/google-chrome',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'win32': 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
};

const platform = os.platform();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform]
  });

  const page = await browser.newPage();

  const cdDiegao = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV');
  const cdMaykao = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLoifcDIBeuuAhh4_799RZaSc');
  // const PodcastUseCase = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLoiOC_CjhpYjobA2tnt27TQc')

  // formatar tempo da maneira correta
  const oneHour = 3600;
  const fullTime = cdDiegao + cdMaykao;

  const hours = Math.floor(fullTime / oneHour);
  const minutes = Math.floor((fullTime % oneHour) / 60);
  const seconds = fullTime % 60;

  console.log(`Produzimos ${hours}:${minutes < 10 ? ('0' + minutes) : minutes}:${seconds} de conteúdo para o Code/Drops`);

  await browser.close();
})();
