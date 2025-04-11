const copyRobotsButton = document.getElementById('copyRobotsButton');
const downloadRobotsButton = document.getElementById('downloadRobotsButton');
const robotsNotification = document.getElementById('robotsNotification');

function enableRobotsButtons() {
  copyRobotsButton.disabled = false;
  downloadRobotsButton.disabled = false;
}

function disableRobotsButtons() {
  copyRobotsButton.disabled = true;
  downloadRobotsButton.disabled = true;
}

function generateRobotsTxt() {
  const websiteUrl = document.getElementById('websiteUrl').value.trim();
  
  let domain = websiteUrl;
  if (domain.endsWith('/')) {
    domain = domain.slice(0, -1);
  }

  let robotsTxt = `# all user agents\nUser-agent: *\n\n`;
  robotsTxt += `# exclude pagination and query pages\n`;
  robotsTxt += `Disallow: /search*updated-max=*\n`;
  robotsTxt += `Disallow: /search*max-results=*\n`;
  robotsTxt += `Disallow: /search*q=*\n\n`;
  robotsTxt += `# include everything else\nAllow: /\n\n`;

  if (websiteUrl) {
    robotsTxt += `# sitemaps\n`;
    robotsTxt += `Sitemap: ${domain}/sitemap.xml\n`;
    robotsTxt += `Sitemap: ${domain}/sitemap-pages.xml\n`;
  }

  document.getElementById('outputRobotsTxt').value = robotsTxt;
  enableRobotsButtons();
}

function resetRobotsTxt() {
  document.getElementById('websiteUrl').value = '';
  document.getElementById('outputRobotsTxt').value = '';
  disableRobotsButtons();
}

function copyRobotsToClipboard() {
  const outputRobotsTxt = document.getElementById('outputRobotsTxt');
  outputRobotsTxt.select();
  document.execCommand('copy');
  showRobotsNotification();
}

function downloadRobotsTxt() {
  const outputRobotsTxt = document.getElementById('outputRobotsTxt').value;
  const blob = new Blob([outputRobotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showRobotsNotification() {
  robotsNotification.classList.add('show');
  setTimeout(() => {
    robotsNotification.classList.remove('show');
  }, 3000);
}

disableRobotsButtons();
