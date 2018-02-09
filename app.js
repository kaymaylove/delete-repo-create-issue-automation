const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

const octonode = require('octonode');
const bodyParser = require('body-parser');
const path = require('path');

var github_api_token = 'enter your token here';
var github_notification_repository = 'enter the repo name where you will create issues';
var github_domain = 'https://github.com';

var request = require('request');

app.use(bodyParser.json());

app.post('/delete-repository-event', function(request, response) {
    // console.log(request.body);
    var action = request.body.action;

    console.log(action);

    if (action == 'deleted') {
        var deleted_repo_name = request.body['repository']['full_name'];
        var owner_login = request.body['sender']['login'];
        var client = octonode.client(github_api_token);
        var repo = client.repo('mastiha/' + github_notification_repository);

        // repo.issues(function(err, data, headers) {
        //   console.log(err);
        //   console.log(data);
        //   console.log(headers);
        // });

        var result = repo.issue({
                title: "Repository deleted: " + deleted_repo_name,
                body: "Check out why this repository was deleted \n" + "@" + owner_login
            },
            function(err, data, headers) {
                //console.log(err);
                console.log(data);
            });
    }

    // //error handling cases, example from octokit

    // process.on('unhandledRejection', (error) => {
    //     if (error.code === 401) {
    //         // this is due to our invalid authentication token, so we ignore it
    //         return
    //     }

    //     if (error.code === 403) {
    //         // when API rate limit is reached 403 Forbidden is thrown
    //         return
    //     }

    //     if (/getaddrinfo ENOTFOUND github.com/.test(error.message)) {
    //         // expected error from enterpriseUploadAsset, ignore
    //         return
    //     }

    //     console.log(error)
    //     process.exit(1)
    // })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))