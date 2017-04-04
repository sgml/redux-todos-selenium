const webdriver = require("selenium-webdriver");

const driver = new webdriver.Builder()
  .forBrowser("phantomjs")
  .build();

module.exports = driver;
