const functions = require('../_services/scrap.service');

module.exports = {
    scrapAllAds,
    scrapListingPage,
    scrapNextPageUrl,
    scrapTotalAdsCount
};

/**
 * Total Ads Count in a listing page 
 * @param { req.body.url | optional } req 
 * @param { JSON } res 
 * @param {*} next 
 */
function scrapTotalAdsCount(req,res,next) {

    let url;
    if(req.body) {
        url = req.body.url;
    }
    functions.getTotalAdsCount(url)
    .then((item)=>{
        if(item.success) {
            res.status(200).json({
                success: true,
                data : item.data
            })
        }
    })
    .catch((error)=>{
        next(error);
    })

}

/**
 * Next page url from a listing page
 * @param { req.body.url | optional } req 
 * @param { JSON } res 
 * @param {*} next 
 */
function scrapNextPageUrl(req,res,next) {

    let url;
    if(req.body) {
        url = req.body.url;
    }
    functions.getNextPageUrl(url)
    .then((result)=>{
        if(result.success) {
            res.status(200).json(result);
        } else {
            res.status(304).json(result);
        }
    })
    .catch((error)=>{
        next(error);
    })

}

/**
 * Listing page ads list with ids
 * @param { req.body.url | optional } req 
 * @param { JSON } res 
 * @param {*} next 
 */
function scrapListingPage(req,res,next) {

    let url;
    if(req.body) {
        url = req.body.url;
    }
    functions.addItems(url)
    .then((item)=>{
        if(item.success) {
            res.status(200).json({
                success: true,
                data : item.data
            })
        }
    })
    .catch((error)=>{
        next(error);
    })

}

/**
 * Scrap all ads from a listing page
 * @param { req.body.url | optional } req 
 * @param { JSON } res 
 * @param {*} next 
 */
function scrapAllAds(req,res,next) {

    let url;
    if(req.body) {
        url = req.body.url;
    }
    functions.addItems(url)
    .then((item)=>{
        if(item.success) {
            let ads = [];
            item.data.forEach(element => {
                functions.scrapeTruckItem(element.url)
                .then((result)=>{
                    if(result.success) {
                        ads.push({
                            ad: element.url,
                            data: result.data
                        });
                    }
                    if(item.data.length == ads.length) {
                        res.status(200).json({
                            success: true,
                            ads
                        });
                    }

                })
            });
        }
    })
    .catch((error)=>{
        next(error);
    })

}