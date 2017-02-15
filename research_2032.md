### Description of problem and its consequences
We need a way link to the analytics data to particular API ID. This allows us to delete the API along with corresponding analytics data. This would also improve our API owner dashboard.

### Solution options
Now it can not be resolved on the platform side via particular API ID. It depends on a structure of ElasticSearch index which doesn't support storage of API ID. [Issue] (https://github.com/NREL/api-umbrella/issues/25)
A suggestion is using the frontend prefix.

#### Pros
1.  After adding namespace for prefix the request path must be unique for using as link

#### Cons
1. Need to re-write realisation when ElasticSearch index will include the field for storing API ID.