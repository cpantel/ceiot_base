const {Builder, By, until, Key} = require('selenium-webdriver');
const {expect} = require('chai');
var firefox = require('selenium-webdriver/firefox');
let TIMEOUT=200000;

describe('web application test with selenium webdriver', function() {
  let driver;
  this.timeout(TIMEOUT)
  const options = new firefox.Options();
  
  before(async function() {
    driver = new Builder().forBrowser('firefox').build();
  });  
  it('check login ask for username', async function() {
    this.timeout(TIMEOUT);
    await driver.get('http://localhost:4200');

    await driver.findElement(By.id('username')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('pwd')).then(element=> element.sendKeys('admin'));	   
    await driver.findElement(By.id('loginBtn')).then(element=> element.click());	   
    let element = await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-list-user/div/table/tbody/tr[3]/td[3]')),TIMEOUT);
    let value   = await element.getText();
    expect(value).to.equal('admin@samauec.org');	   
  });
  after( () =>
    driver && driver.quit()
  );
});

