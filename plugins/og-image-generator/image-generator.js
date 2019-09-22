const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = screenshot;
async function screenshot(PostArray) {
  const headless = true; // for debug
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 628 });
  const getHtml = require('./image');
  console.log('taking screenshots...');
  for (let i = 0; i < PostArray.length; i++) {
    const post = PostArray[i];
    const fontSize =
      Math.min(
        20,
        Math.max(7, Math.floor(100 / (post.title.length + post.company.length)))
      ) + 'vw';
    const html = getHtml({
      fileType: 'jpg',
      title: post.title,
      company: post.company,
      fontSize
    });

    await page.setContent(html);
    const filePath = path.resolve(`static/og_image/${post.slug}.png`);
    ensureDirectoryExistence(filePath);
    await page.screenshot({ path: filePath });
  }
  if (headless) {
    await browser.close();
  }
  console.log(`Finished taking ${PostArray.length} screenshots.`);
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
