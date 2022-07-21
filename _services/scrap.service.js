const fetchWithRetry = require('./fatch.service');
const config = require('../config.json');

module.exports = {
    getNextPageUrl,
    addItems,
    getTotalAdsCount,
    scrapeTruckItem
};

/**
 * 
 * @param {optional | string} endPoint? 
 * @returns Object
 * @key success : true | false
 * @key data
 */
function getNextPageUrl(endPoint) {

    return new Promise((resolve, reject) => {

        if(!endPoint) {
            endPoint = config.endPoint;
        }

        try {
            // with retry strategies
            fetchWithRetry(endPoint,config.totalRetry)
            .then((result)=>{
                let $ = result;
                let pagelist= [];
                let finalUrl='';
                $("ul[data-testid='pagination-list'] li").each((index, element) => {
                    const number = parseInt($(element).text());
                    if(number){
                        pagelist.push(number);
                    }
                });
                let lastPage = pagelist[pagelist.length-1];
                if(lastPage > 0) {
                    // pagination found
                    if(endPoint.includes('&page=')){
                        let currentPage = parseInt(endPoint.substring(endPoint.length - 2, endPoint.length)) ? parseInt(endPoint.substring(endPoint.length - 2, endPoint.length)) : parseInt(endPoint.substring(endPoint.length - 1, endPoint.length));
                        if(lastPage > currentPage) {
                            finalUrl = parseInt(endPoint.substring(endPoint.length - 2, endPoint.length)) ? endPoint.slice(0, -2) + `${currentPage+1}` : endPoint.slice(0, -1) + `${currentPage+1}`;
                        } else {
                            // we are on last page
                            finalUrl = parseInt(endPoint.substring(endPoint.length - 2, endPoint.length)) ? endPoint.slice(0, -2) + `${lastPage}` : endPoint.slice(0, -1) + `${lastPage}`;
                            return resolve({
                                success: lastPage == currentPage,
                                data: finalUrl,
                                message: "we are on last page"
                            });
                        }
                    } else {
                        finalUrl = endPoint + '&page=2';
                    }
                } else {
                    // no pagination found
                    return resolve({
                        success: false,
                        data: endPoint,
                        message: "no pagination found"
                    });
                }
                return resolve({
                    success: true,
                    data: finalUrl
                });
            })
            .catch((error)=>{
                throw reject(error);
            })
        } catch (error) {
            throw reject(error);
        }
    });

}

/**
 * 
 * @param {optional | string} endPoint? 
 * @returns Object
 * @key success : true | false
 * @key data { url, id } 
 */
function addItems(endPoint){

    return new Promise((resolve, reject) => {

        if(!endPoint) {
            endPoint = config.endPoint;
        }

        try {
            // with retry strategies
            fetchWithRetry(endPoint,config.totalRetry)
            .then((result)=>{
                let $ = result;
                let data = [];
                $("main[data-testid='search-results']").find('article').each((index, element) => {
                    let url = $(element).find('div > h2 > a').attr('href');
                    let id = $(element).attr('id');
                    data.push({
                        url,
                        id                
                    });
                });
                return resolve({
                    success:true,
                    data
                });
            })
            .catch((error)=>{
                throw reject(error);
            })
        } catch (error) {
            throw reject(error);
        }
    });
}

/**
 * 
 * @param {optional | string} endPoint? 
 * @returns Object
 * @key success : true | false
 * @key data 
 */
function getTotalAdsCount(endPoint){

    return new Promise((resolve, reject) => {

        if(!endPoint) {
            endPoint = config.endPoint;
        }

        try {
            // with retry strategies
            fetchWithRetry(endPoint,config.totalRetry)
            .then((result)=>{
                let $ = result;
                let data = 0;
                $("main[data-testid='search-results']").find('article').each((index, element) => {
                    data++;
                });
                return resolve({
                    success:true,
                    data
                });
            })
            .catch((error)=>{
                throw reject(error);
            })
        } catch (error) {
            throw reject(error);
        }
    });
}

/**
 * 
 * @param {optional | string} endPoint 
 * @returns Object
 * @key success : true | false
 * @key data { item_id, title, price, registration_date, production_date, mileage, power }
 */
function scrapeTruckItem(endPoint){

    return new Promise((resolve, reject) => {

        if(!endPoint) {
            throw reject("Please provide an ad url");
        }

        try {
            // with retry strategies
            fetchWithRetry(endPoint,3)
            .then((result)=>{
                let data = {};
                let $ = result;
                data['item_id'] = $('#ad_id').first().text();
                data['title'] = $('title').text();
                data['price'] = $('.offer-price.changeFinanceLinkOrder').attr('data-price');
                
                $('#parameters li').each((index, element) => {
    
                    const params__label = $(element).find('.offer-params__label').text().trim();
                    const params__value = $(element).find('.offer-params__value').text().trim();
                    
                    if(params__label == 'Pierwsza rejestracja') {
                        data['registration_date'] = params__value;
                    }
                    if(params__label == 'Rok produkcji') {
                        data['production_date'] = params__value;
                    }
                    if(params__label == 'Przebieg') {
                        data['mileage'] = params__value;
                    }
                    if(params__label == 'Moc') {
                        data['power'] = params__value;
                    }
                    
    
                });
                return resolve({
                    success: true,
                    data
                });
                
            })
            .catch((error)=>{
                throw reject(error);
            })
        } catch (error) {
            throw reject(error);
        }
    });

}
