### Description of problem and its consequences 
We are interested to have analytics about the API key usage per API. API key is available in the API Umbrella drilldown dashboard, but does not appear to be available in the drilldown analytics results.

### Research result

All data which are available on the analytics page are available via REST API as well. Request to fetch data and response. The problem is to understand response structure.


### Host
- https://nightly.apinf.io:3002
### Endpoint
- `/api-umbrella/v1/analytics/drilldown.json`
### Request parameters
- prefix=1/nightly.apinf.io:3002/
- start_at=2017-02-09
- end_at=2017-02-18
- interval=day
- query=`{"condition":"AND","rules":[{"id":"api_key","field":"api_key","type":"string","input":"text","operator":"equal","value":"3uFSk7GH9vImyv5K6ia66mEoUQj4gdtfIQjA5ENb"}]}`

### Response
```json
{
	"results": [{
		"depth": 1,
		"path": "nightly.apinf.io:3002/ss",
		"terminal": true,
		"descendent_prefix": "2/nightly.apinf.io:3002/ss",
		"hits": 2
	}, {
		"depth": 1,
		"path": "nightly.apinf.io:3002/alternative/",
		"terminal": false,
		"descendent_prefix": "2/nightly.apinf.io:3002/alternative/",
		"hits": 1
	}],
	"hits_over_time": {
		"cols": [{
			"id": "date",
			"label": "Date",
			"type": "datetime"
		}, {
			"id": "1/nightly.apinf.io:3002/ss",
			"label": "nightly.apinf.io:3002/ss",
			"type": "number"
		}, {
			"id": "1/nightly.apinf.io:3002/alternative/",
			"label": "nightly.apinf.io:3002/alternative/",
			"type": "number"
		}],
		"rows": [{
			"c": [{
				"v": 1486598400000,
				"f": "Thu, Feb 9, 2017"
			}, {
				"v": 0,
				"f": "0"
			}, {
				"v": 0,
				"f": "0"
			}]
		}, {
			"c": [{
				"v": 1486684800000,
				"f": "Fri, Feb 10, 2017"
			}, {
				"v": 0,
				"f": "0"
			}, {
				"v": 1,
				"f": "1"
			}]
		}, {
			"c": [{
				"v": 1486771200000,
				"f": "Sat, Feb 11, 2017"
			}, {
				"v": 0,
				"f": "0"
			}, {
				"v": 0,
				"f": "0"
			}]
		}, {
			"c": [{
				"v": 1486857600000,
				"f": "Sun, Feb 12, 2017"
			}, {
				"v": 0,
				"f": "0"
			}, {
				"v": 0,
				"f": "0"
			}]
		}, {
			"c": [{
				"v": 1486944000000,
				"f": "Mon, Feb 13, 2017"
			}, {
				"v": 2,
				"f": "2"
			}, {
				"v": 0,
				"f": "0"
			}]
		}, {
			"c": [{
				"v": 1487030400000,
				"f": "Tue, Feb 14, 2017"
			}, {
				"v": 0,
				"f": "0"
			}, {
				"v": 0,
				"f": "0"
			}]
		}]
	},
	"breadcrumbs": [{
		"crumb": "All Hosts",
		"prefix": "0/"
	}, {
		"crumb": "nightly.apinf.io:3002",
		"prefix": "1/nightly.apinf.io:3002/"
	}]
}
```

### Parsed response
1. API with frontend prefix is **/ss** 
   - doesn't have the nested path because value of `terminal` is true (just hypothesis)
   - data: `[{
        x: "Thu, Feb 9, 2017",
        y: 0
   },{
        x: "Thu, Feb 10, 2017",
        y: 0
   },{
        x: "Thu, Feb 11, 2017",
        y: 0
   },{
        x: "Thu, Feb 12, 2017",
        y: 0
   },{
        x: "Thu, Feb 13, 2017",
        y: 2
   },{
        x: "Thu, Feb 14, 2017",
        y: 0
   },]`

2. API with frontend prefix is **/alternative/**
   - has the nested path because value of `terminal` is false (just hypothesis)
   - data: `[{
        x: "Thu, Feb 9, 2017",
        y: 0
   },{
        x: "Thu, Feb 10, 2017",
        y: 1
   },{
        x: "Thu, Feb 11, 2017",
        y: 0
   },{
        x: "Thu, Feb 12, 2017",
        y: 0
   },{
        x: "Thu, Feb 13, 2017",
        y: 2
   },{
        x: "Thu, Feb 14, 2017",
        y: 0
   },]`