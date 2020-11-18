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
  
  const fullTime = cdDiegao + cdMaykao;

  const hours = Math.floor(fullTime / 60 / 60);
  const minutes = Math.floor(fullTime % (60 * 60) / 60);
  const seconds = fullTime % 60;

  console.log(
    `Produzimos ${hours}:${minutes}:${seconds} de conteúdo para o Code/Drops`
  );
  
  await browser.close();
})();