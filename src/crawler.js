const puppeteer = require('puppeteer-core');
const os = require('os');
const getVideosTime = require('./getVideosTime');

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

  const cdDiegao = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV')
  const cdMaykao = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLoifcDIBeuuAhh4_799RZaSc')
  
  // let [hours, minutes, seconds] = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PL85ITvJ7FLoiOC_CjhpYjobA2tnt27TQc')
  let hours = cdDiegao[0] + cdMaykao[0];
  let minutes = cdDiegao[1] + cdMaykao[1];
  let seconds = cdDiegao[2] + cdMaykao[2];

  // formatar da maneira correta

  const minutesFromSeconds = Math.floor(seconds / 60);
  
  seconds = seconds % 60;
  minutes += minutesFromSeconds;

  const hoursFromMinutes = Math.floor(minutes / 60);

  minutes = minutes % 60;
  hours += hoursFromMinutes;

  console.log(
    `Produzimos ${hours}:${minutes}:${seconds} de conteúdo para o Code/Drops`
  );
  
  await browser.close();
})();