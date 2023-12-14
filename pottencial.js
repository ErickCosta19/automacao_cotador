const puppeteer = require('puppeteer');

(async () => {

    const loginURL = 'https://hefesto.pottencial.com.br/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Did_token%2520token%26client_id%3Dpottencial-rdengenharia-riscosdiversos-web%26state%3DVko0SFBqSnk0czlpOG5mY1UxTDhzb19zZWFtRWtuQ0xHc0w5aGxPdjdqSi13%26redirect_uri%3Dhttps%253A%252F%252Frd.pottencial.com.br%252Fauth-callback%26scope%3Dopenid%2520profile%2520pottencial-rdengenharia-riscosdiversos-api%26nonce%3DVko0SFBqSnk0czlpOG5mY1UxTDhzb19zZWFtRWtuQ0xHc0w5aGxPdjdqSi13'

    const username = 'danielle.oliveira@vencorr.com'
    const password = 'euchamprA07!'

    // Abre uma nova pagina em branco
    const browser = await puppeteer.launch({
        //mudar o headless para true quando usar como bot
        headless: false,
    });
    const page = await browser.newPage(); 
    // Direciona a pagina para a URL
    await page.goto(loginURL);
    await page.setViewport({width: 1366, height: 768});
    await page.type('#Username', username);
    await page.type('#Password', password);
    await page.click('button[value="login"]');
    
    //espera até chegar no link https://rd.pottencial.com.br/dashboard
    await page.waitForFunction(
        'window.location.href === "https://rd.pottencial.com.br/dashboard"'
    )

    
    
    //procura o botão com o seletor XPath
    let newQuotationButton = await page.$x("//button/span[contains(., 'NOVA COTAÇÃO')]");
    await newQuotationButton[0].click();

    // Esperar por 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let combobox = await page.$x("//div/div/*[@placeholder='Produto']");
    await combobox[0].click();

    let options = await page.$x("//span[contains(text(), 'POTTENCIAL EQUIPAMENTOS')]")
    console.log(options)
    await options[0].click()

    //await browser.close();
        
})();
