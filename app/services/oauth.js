var OAuth = require('oauth');


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
    function (e, access_token, refresh_token, results) {
        console.log('bearer: ', access_token);
        oauth2.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&count=4',
            access_token,
            function (e, data, res) {
                console.log(res);
                if (e) {
                    return callback(e, null);
                }
                if (res.statusCode != 200) {
                    return callback(new Error(
                            'OAuth2 request failed: ' +
                            res.statusCode), null);
                }
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    return callback(e, null);
                }
                return callback(e, data);
            });
    });
function callback(e, data) {
    console.log(e, data);
}