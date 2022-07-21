# eastnetic_viva
## _Md Sultanul Arefin_

****
## Task 
Need to use: node - for running scraping cheerio - for parsing html file (https://www.npmjs.com/package/cheerio, used similarly as jquery) either puppeteer/playwright or request-promise for fetching ads Purpose: scrape otomoto.pl portal using provided interface

- Initial url https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/ od-2014/q-actros? search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at %3Adesc
- Add getNextPageUrl function to iterate over pages
- Add addItems function that fetches item urls + item ids (unique ids that the portal uses) from list page
- Add getTotalAdsCount function - shows how many total ads exist for the provided initial url
- Add scrapeTruckItem function - that scrapes the actual ads and parses into the format: item id, title, price, registration date, production date, mileage, power
- Scrape all pages, all ads


***
## Library 

I uses a number of open source projects to work properly:

- [Cheerio](https://breakdance.github.io/breakdance/) - HTML parser for scraping!
- [Request-Promise](https://breakdance.github.io/breakdance/) - The simplified HTTP request client 'request' with Promise support.
- [node.js] - evented I/O for the backend.
- [Express] - fast node.js network app framework.
## Files

API is developed with the following main files.

| File | Location |
| ------ | ------ |
| Config file | config.json |
| Fatch with retry | _services\fatch.service.js |
| Scraping functions | _services\scrap.service.js |
| Controller functions | _controllers\scrap.controller.js |
| Routing functions | _routers\v1\scrap.router.js |


## Installation

It requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd eastnetic_viva
npm i
npm run start
```
By default, the app will run on port 8080
```sh
Server listening on port 8080
```

## Basic usage

API requests should be prefixed with `v1` API version. For example, the root of the v1 API
is at `/v1`.

Example of a valid API request using cURL:

```shell
curl "http://localhost:8080/v1/scrap_listing_page"
```

The API uses JSON to serialize data. so we don't need to specify `.json` at the
end of an API URL.

By default, the app will start scraping with url ``https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc``
if we want to changed scraping url then we need to attached new url with `Request Body` as `JSON` format. ( OPTIONAL)

```
HTTP/1.1 Request Body
Content-Type: application/json
{
    "url": "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc&page=3"
}
```

if the request is success then it with return with `200` status code as following

```json
{
  "success": true,
  "data": [
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1844-ID6ELifi.html",
      "id": "6099121988"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-mp4-ID6EFfnU.html",
      "id": "6097681022"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-acxtros-1851-ls-full-opcja-bigspace-hydraulika-ID6EoWsJ.html",
      "id": "6093791193"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-mercedes-actros-low-deck-ID6EFRDO.html",
      "id": "6097828080"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-1844-ls-ID6EAxW0.html",
      "id": "6096560626"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1848-gigaspace-bez-retarder-l0wdeck-mega-ID6EzUdO.html",
      "id": "6096408032"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-lsnrl-regulowane-siodlo-bi-xenon-klima-postojowa-import-de-doinwestowany-ID6EMS6v.html",
      "id": "6099498156"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-stream-space-retarder-fleetboard-euro-6-ID6ENJaV.html",
      "id": "6099702162"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-2855-ls-6x4-jeden-wlasciciel-w-de-tylko-317-tys-km-stan-igla-6x4-ID6ECe6F.html",
      "id": "6096961125"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-1845-2011-2012-gigaspace-automat-mega-standard-euro-5-ID6EKdAx.html",
      "id": "6098865757"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-ID6ENITd.html",
      "id": "6099701063"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1844-ID6ENILH.html",
      "id": "6099700597"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1842-low-deck-bigspace-low-deck-bigspace-automat-ID6EHcoH.html",
      "id": "6098146195"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-stream-space-low-deck-2019-r-mega-polski-salon-euro-6-ID6ENI0X.html",
      "id": "6099697699"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-stream-space-euro-5-ID6EtGZD.html",
      "id": "6094927213"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1843-hyadraulika-euro-6-z-niemiec-ID6Et6G2.html",
      "id": "6094787614"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1840-mp4-euro-6-pelny-adr-automat-czerwony-pasek-polski-salon-pelen-serwis-ID6ELExa.html",
      "id": "6099207664"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1842ls-ID6EJjNc.html",
      "id": "6098651278"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-euro-6-standard-ID6EJ1J1.html",
      "id": "6098581827"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-lsnrl-regulowane-siodlo-bi-xenon-klima-postojowa-import-de-doinwestowany-ID6EL3m4.html",
      "id": "6099064748"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-bigspace-lowdeck-ID6EL3fM.html",
      "id": "6099064358"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1848-euro6-giga-space-mercedes-benz-actros-1848-euro6-giga-space-mega-2018-rok-ID6EM2Rx.html",
      "id": "6099301183"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-euro-5-pto-ID6EKbof.html",
      "id": "6098857307"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-mercedes-actros-ID6EIayb.html",
      "id": "6098377423"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-mp4-2017-actros-mp4-2017r-ID6EAUBa.html",
      "id": "6096647808"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-ls-ID6EKaVJ.html",
      "id": "6098855601"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-mp4-euro-6-low-deck-retarder-ID6EM2cO.html",
      "id": "6099298658"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-ID6EMKDV.html",
      "id": "6099469476"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1848-acc-e-6-mega-low-deck-giga-space-ID6EMLpl.html",
      "id": "6099472415"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-450-euro-5-ID6EB72n.html",
      "id": "6096695623"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-ID6Eugm4.html",
      "id": "6095063144"
    },
    {
      "url": "https://www.otomoto.pl/oferta/mercedes-benz-actros-1845-mega-od-wlasciciela-okazja-ID6EKa2k.html",
      "id": "6098852104"
    }
  ]
}
```
Others valid API request using cURL:


# Scrap all ads from a listing page
```shell
curl "http://localhost:8080/v1/scrap_all"
```
# Total Ads Count in a listing page 
```shell
curl "http://localhost:8080/v1/scrap_total_ads"
```
# Next page url from a listing page
```shell
curl "http://localhost:8080/v1/scrap_next_page_url"
```
## Status codes
The API is designed to return different status codes according to context and
action. This way, if a request results in an error, the caller is able to get
insight into what went wrong.

The following table gives an overview of how the API functions generally behave.

| Request type | Description |
| ------------ | ----------- |
| `POST`  | Return `200 Created` if the resource is successfully scrap and return the newly scrap resource as JSON. |

The following table shows the possible return codes for API requests.

| Return values | Description |
| ------------- | ----------- |
| `200 OK` | The `POST` request was successful, the resource(s) itself is returned as JSON. |
| `304 Not Modified` | Indicates that the resource has not been modified since the last request. |
| `400 Bad Request` | A required attribute of the API request is missing, e.g., the title of an issue is not given. |
| `404 Not Found` | A resource could not be accessed, e.g., an ID for a resource could not be found. |
| `500 Server Error` | While handling the request something went wrong server-side. |

## License

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>

