# gatsby-source-fixer-io

[![Build Status](https://travis-ci.org/kenigbolo/fixer-io-utility.svg?branch=master)](https://travis-ci.org/kenigbolo/fixer-io-utility)

## Description

This is a source plugin for Gatsby that will bring data (rates, conversion etc.) from [Fixer](https://fixer.io) to be available in GraphQL queries. This utility will be occasionaly maintained to keep up with the happenings to endpoints on [fixer.io](https://fixer.io/documentation#endpoints)

## Dependencies

* NPM 6.x
* Node 9.x
* [fixer-io-utility](https://www.npmjs.com/package/fixer-io-utility)

## NPM

This package has been published on [NPM](https://www.npmjs.com/package/gatsby-source-fixer-io) and is freely available according to the MIT license. To install via npm simply run `npm install gatsby-source-fixer-io`.

## Gatsby Usage

Install the source plugin from your Command Line

```
npm i gatsby-source-fixer-io
```

or

```
yarn add gatsby-source-fixer-io
```

In your `gatsby-config.js` configure the following

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-fixer-io',
      options: {
        apiKey: 'YOUR_FIXER_IO_API_KEY', /* Required Field */
        endpoint: 'name of endpoint e.g. `latest`', /* Required Field */
        query: { /* Optional */
          base: 'base currency e.g. EUR',
        }
      }
    }
  ]
}
```

## Configuration Options

The configuration for this plugin follows supports the requests listed on [fixer](https://fixer.io)

1. The `apiKey` - This refers to the unique client api key generated at fixer.io. Register for an account and then navigate to your [dashboard](https://fixer.io/dashboard) where you will find you API Key.

2. The `endpoint` - This refers to the endpoint to which the call should be made. The available options at the moment of this writing are `latest`,`symbols`, `convert`, `timeseries`, `fluctuation` and `dates e.g. YYYY-MM-DD`. Kindly consult the official [endpoint documentation](https://fixer.io/documentation#endpoints) for any endpoints not listed here, however the pluggin is flexible to support new endpoints without any changes needed whenever new plugins are available.

3. The `query` - This refers to a javascript object constructed to match the require params in a `key - value` format. Kindly consult the official [endpoint documentation](https://fixer.io/documentation#endpoints) for the available parameter fields that can be used. The format of the query object should always mimick same as in the official documentation. 

Below is an example taken directly from the fixer.io Historical rates Endpoint documentation and converted into a gatsby configuration

From Fixer.io
```
http://data.fixer.io/api/2013-12-24
    ? access_key = API_KEY
    & base = GBP
    & symbols = USD,CAD,EUR
```

Representation in `gatsby-config.js`
```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-fixer-io',
      options: {
        apiKey: '1234ABCD5678EFGH90IJ',
        endpoint: '2013-12-24',
        query: { 
          base: 'GBP',
          symbols: 'USD,CAD,EUR'
        }
      }
    }
  ]
}
```

## Querying Fixer IO endpoints

Once the plugin is configured, two new queries are available in GraphQL: `allFixerIoData<Endpoint>` and `fixerIoData<Endpoint>`. It is important to note that regardless of how you specify the endpoint string, in the available GraphQL queries, the string is capitalized i.e. the first letter of the string will be converted to a capital letter except for dates e.g. `2013-12-24` as they will remain as is. Typically the queries should look thus `fixerIODataLatest` where `latest` is the endpoint or `fixerIOData2013-12-24` where `2013-12-24` is the endpoint

An example GraphQL query should look to get the latest rate of EUR to USD should look thus
```
{
  fixerIoDataLatest {
    rates {
      USD
    }
  }
}
```
where the `gatsby-config.js` options field for the plugin are configured thus
```javascript
options: {
  apiKey: "1234ABCD5678EFGH90IJ",
  endpoint: "latest",
  query: {base: "EUR"},
}
```

## Disclaimer
I am in no way connected to those who work at fixer.io. Project is simply a side project which I use and will try to maintain and expand as much as I can.