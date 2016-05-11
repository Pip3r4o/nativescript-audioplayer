var AudioPlayer = (function () {
    var Player = (function () {
        
        function Player() {
            // this.player =  android.media.MediaPlayer();
            // or something
        }
        //                                
        Player.prototype.play = function (resourceUrl/*doesnt do anything right now*/) {
            var app = require("application");
            var context = app.android.context;
            var mp = android.media.MediaPlayer.create(context, org.nativescript.soundApp.R.raw.gg);
            try {
                mp.prepare();
            } catch (e) {
                console.log("err on mp.prepare: " + e);
            }

            mp.start();
        };
        Player.prototype.stop = function () {
            console.log("in stop");
        };
        Player.prototype.reset = function () {
            console.log("in reset");
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
