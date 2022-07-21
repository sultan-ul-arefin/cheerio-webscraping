const express = require('express');
const router = express.Router();
const scrapController = require('../../_controllers/scrap.controller');

// routes

// 1) Scrap all ads from a listing page
router.post('/scrap_all', scrapController.scrapAllAds); 

// 2) Listing page ads list with ids
router.post('/scrap_listing_page', scrapController.scrapListingPage);

// 3) Total Ads Count in a listing page 
router.post('/scrap_total_ads', scrapController.scrapTotalAdsCount);

// 4) Next page url from a listing page
router.post('/scrap_next_page_url', scrapController.scrapNextPageUrl);


module.exports = router;