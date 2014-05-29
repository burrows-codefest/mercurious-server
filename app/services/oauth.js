var OAuth = require('oauth');
var https = require('https');

var OAuth2 = OAuth.OAuth2;
var twitterConsumerKey = '2xBlAkskMzAxGun1IB3WNuk3d';
var twitterConsumerSecret = 'Tu1PYdVPLdbQ6hXVUHy0JzRSL5mLntF9jbPmC4oLpkNxDrMDKk';

var oauth2 = new OAuth2(
    twitterConsumerKey,
    twitterConsumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null);
oauth2.getOAuthAccessToken(
    '',
    {'grant_type': 'client_credentials'},
    function (e, access_token) {
        console.log('bearer: ', access_token);

        var options = {
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json?screen_name=mostlyharmlessd',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        };

        https.get(options, function(result){
            result.setEncoding('utf8');
            result.on('data', function(data){
                console.log(data); //the response!
            });
        });


    });
function callback(e, data) {
    console.log(e, data);
}