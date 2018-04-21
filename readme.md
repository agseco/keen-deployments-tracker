# keen-deployments-tracker
Simple deployments tracker using Keen.io implemented on ```node.js```.

## Initial analysis & use cases

### Know what version is currently deployed
Get the details from the last deployment.

### Know what changes set were included in the last deployment
List of changes between the previously deployed version and current.

## Deployment data
Data to be saved as a Keen.io event in a collection; one collection for each repository (1-1).

Upon deployment, the following data is to be saved:
- Host - what host/server you are deploying in a given app (the same app may be deployed in multiple hosts)
- Environment
- App/project name (explicit argument or automatically obtained from the repository's origins?)
- Last commit information
  - Hash
  - Message
  - Author
- List of commits between previous version and current

Assumed all data to be fetched from a local git repository already available at deployment time (e.g. previously cloned for packaging).

Sample event data:

```
{
  "type": "DEPLOYMENT",
  "host": "test.host.com"
  "environment:" "PROD",
  "branch": "master",
  "lastCommit": {
    "hash": "hue783hd7dbasjas88e2nbdwhds7hdsbds87w",
    "message": "Flux capacitor re-wiring",
    "author": {
      "email": "john@wayne.com",
      "name": "John Wayne"
    }
  },
  "previousCommits": [
    {
      "hash": "hue783hd7dbasjas88e2nbdwhds7hdsbds87w",
      "message": "Added some shit :poop:",
      "author": {
        "email": "john@wayne.com",
        "name": "John Wayne"
      }
    },
    {
      "hash": "hue783hd7dbasjas88e2nbdwhds7hdsbds87w",
      "message": "This is where it all begins...",
      "author": {
        "email": "john@wayne.com",
        "name": "John Wayne"
      }
    }
  ]
}
```

## Parameters/configuration
Variable parameters to be passed in as arguments or provided as configuration:
- Keen.io project ID and keys (read + write)
- Repo location


## TODOs

- Unit/IT tests
  - Add commit that doesn't have previous commits (same commit)
  - Add commit that has previous commits
- Parameterise
  - Collection name
  - Environment