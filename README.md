# Delete Repository, Create Issue Automation through Githib API

A simple web service that listens for repository events to know when a repository has been deleted. When the repository is deleted, an issue is created in a repository in the same organization as the deleted repository. Notifies yourself with an @mention in the automated issue to review the deletion.

### Prerequisites
* [Node](https://nodejs.org/en/download/) - is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side
* NPM - NPM is distributed with [Node.js](https://nodejs.org/en/download/)
* [Ngrok]( https://ngrok.com/download) - is a multiplatform tunneling, reverse proxy software that establishes secure tunnels from a public endpoint such as internet to a locally running network service while capturing all traffic for detailed inspection and replay

### Installing
* Install Nodejs
* Install Ngrok
		
### Getting Started
* In the terminal, write `git clone https://github.com/Todaiji/delete-repo-create-issue-automation.git`
* Navigate to the root of that folder int he terminal and type `install npm` - installs the dependencies/libraries that are needed and default libraries
	* Required Libraries that will be installed: 
		* Octonode - a library for nodejs to access the github v3 api
		* bodyParser - body parsing middleware
		* Express - web framework for node
		* path - contains several helper functions to help make path manipulation easier
* A access token code must be created on your github account
	* Navigate to [Personal Access Tokens](https://github.com/settings/tokens)
	* Generate a new token with all scopes selected
	* Copy the token
* Open `app.js` , enter the token code into the `variable github_api_token`
* Also, create two repos and set the `variable github_notification_repository` to the repository you want to add issues to when another repo is deleted
* Open terminal and type in `ngrok http 3000` (Node runs from port 3000 and 80 is usually reserved. Also, you must run this command where the ngrok.exe is (e.g. Desktop) )
* Copy the url that looks similar to this *http://11789d75.ngrok.io* (this is the url of the tunnel to the internet from your localhost)
* Navigate to github to create a [webhook](https://github.com/organizations/yourorg/settings/hooks/new)
	* In payload url enter your ngrok url + /delete-repository-event (where it is listening)
	* Select Application/JSON
	* Select 'Send Me Everything' and click create webhook
* Open the terminal and navigate to the root and enter in the terminal node `app.js` to start the node server
* Delete a repo and a issue should be added to your designated repo for notifications (this can all be viewed in the console with ngrok running, it will also show errors like authenication issues (invalid token), etc.
	* Also the title and body are customizable in issue, they are located in app.js as `variable result`

## Built With

* [pksunkara](https://github.com/pksunkara/octonode) - a library for nodejs to access the github v3 api


## Authors

* **Karen Port** - [kaymaylove](https://github.com/kaymaylove)

## Acknowledgments

* [mzzmjd](https://github.com/github/platform-samples/tree/master/hooks/ruby/delete-repository-event)
* [Github](https://developer.github.com/v3/)

## Future Improvements

* Integrate error handling
* Create tests to create and delete repositories, then signal success of notification created
