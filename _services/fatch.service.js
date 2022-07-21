const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = fetchWithRetry;

/**
 * 
 * @param {string} url 
 * @param {number} numberOfRetry 
 * @returns 
 */

async function fetchWithRetry(url, numberOfRetry) {
    
    return new Promise((resolve, reject) => {
    
      let attempts = 1;

      const fetch_retry = (url, n) => {
        
        return request(url, (error, response, html) => {

            // (1) check error first
            if(error) {
                if (n === 1) {
                    throw reject("Error in getting http data");                
                }
                else {
                    console.log("Retry with delay " + attempts * 3000);
                    setTimeout(() => {
                        attempts++;
                        fetch_retry(url, n - 1);                    
                    }, attempts * 3000);
                } 
            }

            // (2) if status 200 resolve
            const status = response.statusCode;            
 
            if(status === 200) {
                return resolve(cheerio.load(html));
            }            
            else if (n === 1) {
            // (3) reject only when we are on last try
                throw reject("Error in getting http data");                
            }
            else {
                console.log("Retry with delay " + attempts * 3000);
                setTimeout(() => {
                    attempts++;
                    fetch_retry(url, n - 1);                    
                }, attempts * 3000);
            }            
        });
      }        
      return fetch_retry(url, numberOfRetry);
    });
}