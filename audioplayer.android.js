var AudioPlayer = (function () {
    var Player = (function () {
        
        function Player() {
            this.player =  android.media.MediaPlayer();
        }
        //                                org.nativescript.soundApp.R.raw.gg
        Player.prototype.play = function (resourceUrl) {
            var app = require("application");
            var context = app.android.context;
            this.player.create(context, resourceUrl);
            // var mp = android.media.MediaPlayer.create(context, resourceUrl);
            try {
                this.player.prepare();
            } catch (e) {
                console.log("err on mp.prepare: " + e);
            }

            this.player.start();
            // this.player.prepareToPlay();
            // this.player.play();
        };
        Player.prototype.stop = function () {
            // this.player.stop();
            console.log("in stop");
        };
        Player.prototype.reset = function () {
            console.log("in reset");
            // this.player.stop();
            // this.player.prepareToPlay();
            // this.player.currentTime = 0;
        };
        return Player;
    })();

    var player = new Player();
    
    function pick(relativeURL) {
        return new Promise(function (resolve, reject) {
            // var fs = require("file-system");
            // var types = require("utils/types");

            // var path = types.isString(source) ? source.trim() : "";

            // if (path.indexOf("~/") === 0) {
            //     path = fs.path.join(fs.knownFolders.currentApp().path, path.replace("~/", ""));
            // }

            // if (!fs.File.exists(path)) {
            //     reject("No resource was found at the specified path - \"" + path + "\"");
            //     return;
            // }

            // resolve(path);
        });
    };

    function pickFromDevice() {
        return new Promise(function (resolve, reject) {
            // var mpMediaPickerController = MPMediaPickerController.alloc().initWithMediaTypes(MPMediaTypeAnyAudio);
            // listener = MPMediaPickerControllerDelegateImpl.new().initWithCallback(resolve);
            // mpMediaPickerController.delegate = listener;

            // mpMediaPickerController.allowsPickingMultipleItems = false;

            // var frame = require("ui/frame");
            // var topMostFrame = frame.topmost();
            // if (topMostFrame) {
            //     var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;
            //     if (viewController) {
            //         viewController.presentViewControllerAnimatedCompletion(mpMediaPickerController, true, null);
            //     }
            // }
        });
    };

    return {
        Player: player,
        pick: pick,
        pickFromDevice: pickFromDevice
    };
})();

exports.Audio = AudioPlayer;
