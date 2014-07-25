'use strict';

angular.module('mercuriousApp')
    .service('memeService', function () {
        this.getMemeImages = function () {
            var memeImages = [
                {
                    id: 0,
                    imgUrl: 'images/memeTemplates/1bij.jpg',
                    name: 'One Does Not Simply'
                },
                {
                    id: 1,
                    imgUrl: 'images/memeTemplates/9ehk.jpg',
                    name: 'Batman Slapping Robin'
                },
                {
                    id: 2,
                    imgUrl: 'images/memeTemplates/1bh8.jpg',
                    name: 'The Most Interesting Man In The World'
                },
                {
                    id: 3,
                    imgUrl: 'images/memeTemplates/8p0a.jpg',
                    name: 'Grumpy Cat'
                },
                {
                    id: 4,
                    imgUrl: 'images/memeTemplates/1w6tn.jpg',
                    name: 'Well That Escalated Quickly'
                },
                {
                    id: 5,
                    imgUrl: 'images/memeTemplates/1bhf.jpg',
                    name: 'First World Problems'
                },
                {
                    id: 6,
                    imgUrl: 'images/memeTemplates/7g1q.jpg',
                    name: 'X, X Everywhere'
                },
                {
                    id: 7,
                    imgUrl: 'images/memeTemplates/1bgw.jpg',
                    name: 'Futurama Fry Not Sure'
                },
                {
                    id: 8,
                    imgUrl: 'images/memeTemplates/1bh3.jpg',
                    name: 'Y U No'
                },
                {
                    id: 9,
                    imgUrl: 'images/memeTemplates/1bhk.jpg',
                    name: 'Success Kid'
                },
                {
                    id: 10,
                    imgUrl: 'images/memeTemplates/1bhm.jpg',
                    name: 'Brace Yourselves X is Coming'
                },
                {
                    id: 11,
                    imgUrl: 'images/memeTemplates/1bh9.jpg',
                    name: 'X All The Y'
                },
                {
                    id: 12,
                    imgUrl: 'images/memeTemplates/59qi.jpg',
                    name: 'Picard Wtf'
                },
                {
                    id: 13,
                    imgUrl: 'images/memeTemplates/c2qn.jpg',
                    name: 'That Would Be Great'
                },
                {
                    id: 14,
                    imgUrl: 'images/memeTemplates/5kdc.jpg',
                    name: 'Am I The Only One Around Here'
                },
                {
                    id: 15,
                    imgUrl: 'images/memeTemplates/TONDq.gif',
                    name: 'Aint Nobody Got Time For That'
                },
                {
                    id: 16,
                    imgUrl: 'images/memeTemplates/2nuc.jpg',
                    name: 'Say That Again I Dare You'
                },
                {
                    id: 17,
                    imgUrl: 'images/memeTemplates/wczz.jpg',
                    name: 'Captain Picard Facepalm'
                },
                {
                    id: 18,
                    imgUrl: 'images/memeTemplates/tau4.jpg',
                    name: 'I Should Buy A Boat Cat'
                },
                {
                    id: 19,
                    imgUrl: 'images/memeTemplates/ad77.jpg',
                    name: 'Batman Smiles'
                },
                {
                    id: 20,
                    imgUrl: 'images/memeTemplates/73gr.jpg',
                    name: 'Its Finally Over'
                },
                {
                    id: 21,
                    imgUrl: 'images/memeTemplates/chuck-norris-approves-o.gif',
                    name: 'Chuck Norris Approves'
                },
                {
                    id: 22,
                    imgUrl: 'images/memeTemplates/26hg.jpg',
                    name: 'Yo Dawg Heard You'
                },
                {
                    id: 23,
                    imgUrl: 'images/memeTemplates/1bgy.jpg',
                    name: 'Scumbag Steve'
                },
                {
                    id: 24,
                    imgUrl: 'images/memeTemplates/overly-attached-girlfriend-meme.gif',
                    name: 'Overly Attached Girlfriend'
                },
                {
                    id: 25,
                    imgUrl: 'images/memeTemplates/25w4.jpg',
                    name: 'Sudden Clarity Clarence'
                },
                {
                    id: 26,
                    imgUrl: 'images/memeTemplates/troll-dog_o_635004.gif',
                    name: 'Sneaky Mutt'
                },
                {
                    id: 27,
                    imgUrl: 'images/memeTemplates/fail_o_344718.gif',
                    name: 'Smooth Fail'
                },
                {
                    id: 28,
                    imgUrl: 'images/memeTemplates/olympics_o_570488.gif',
                    name: 'Bored Rowan'
                },
                {
                    id: 29,
                    imgUrl: 'images/memeTemplates/oh_hawkeye.gif',
                    name: 'Ooooh Hawkeye'
                },
                {
                    id: 30,
                    imgUrl: 'images/memeTemplates/tinafeyfive.gif',
                    name: 'Self Gratification'
                },
                {
                    id: 31,
                    imgUrl: 'images/memeTemplates/buzz.gif',
                    name: 'I Come In Peace'
                },
                {
                    id: 32,
                    imgUrl: 'images/memeTemplates/sad-thuin.jpg',
                    name: 'Sad Face'
                },
                {
                    id: 33,
                    imgUrl: 'images/memeTemplates/sad-batman.jpg',
                    name: 'Sad Batman'
                },
                {
                    id: 34,
                    imgUrl: 'images/memeTemplates/OM4syht.gif',
                    name: 'Celebrate'
                },
                {
                    id: 35,
                    imgUrl: 'images/memeTemplates/code_gay.jpg',
                    name: 'I love your code'
                },
                {
                    id: 36,
                    imgUrl: 'images/memeTemplates/Jennifer-Lawrence-Oscars-GIF-2.gif',
                    name: 'YEAH!'
                },
                {
                    id: 37,
                    imgUrl: 'images/memeTemplates/Model-Selection.png',
                    name: 'Design Fail'
                },
                {
                    id: 38,
                    imgUrl: 'images/memeTemplates/BrsYwL-CMAEoYy1.png',
                    name: 'Brotherly love'
                },
                {
                    id: 39,
                    imgUrl: 'images/memeTemplates/image007.jpg',
                    name: 'Only the lonely'
                },
                {
                    id: 40,
                    imgUrl: 'images/memeTemplates/joffrey.jpg',
                    name: 'Joffrey?'
                }
            ];

            return memeImages;
        };
    });
