var AudioPlayer = (function () {
    var types = require("utils/types");

    var Player = (function () {
        function Player() {
            this.player = new AVAudioPlayer();
            this.isPlaying = false;
        }
        Player.prototype.play = function (resourceUrl) {
            var path = resourceUrl;
            if (types.isString(resourceUrl)) {
                path = NSURL.fileURLWithPath(resourceUrl);
            }
            console.log("INSIDE PLAY OF A PLAYER!");
            if (this.isPlaying) {
                this.player.stop();
                this.player.currentTime = 0;
            }

            this.player.initWithContentsOfURLError(path);

            this.player.prepareToPlay();
            this.player.play();

            this.isPlaying = true;
        };
        
        Player.prototype.playLooped = function (resourceUrl, numberOfLoops) {
            numberOfLoops = numberOfLoops || 999;
            console.log("INSIDE PLAYLOOPED OF A PLAYER");
            this.play(resourceUrl);
            this.player.numberOfLoops(numberOfLoops);    
        };
        
        Player.prototype.stop = function () {
            this.player.stop();
            this.isPlaying = false;
        };
        
        Player.prototype.reset = function () {
            this.player.stop();
            this.player.prepareToPlay();
            this.player.currentTime = 0;
            this.player.play();
        };
        return Player;
    })();

    function getPlayer() {
        return new Player();
    }

    // returns resource relative Url
    function pick(relativeURL) {
        return new Promise(function (resolve, reject) {
            var fs = require("file-system");

            var path = types.isString(relativeURL) ? relativeURL.trim() : "";

            if (path.indexOf("~/") === 0) {
                path = fs.path.join(fs.knownFolders.currentApp().path, path.replace("~/", ""));
            }

            if (!fs.File.exists(path)) {
                reject("No resource was found at the specified path - \"" + path + "\"");
                return;
            }

            resolve(path);
        });
    };

    // returns NSURL object
    function pickFromDevice() {
        return new Promise(function (resolve, reject) {
            var mpMediaPickerController = MPMediaPickerController.alloc().initWithMediaTypes(MPMediaTypeAnyAudio);
            listener = MPMediaPickerControllerDelegateImpl.new().initWithCallback(resolve);
            mpMediaPickerController.delegate = listener;

            mpMediaPickerController.allowsPickingMultipleItems = false;

            var frame = require("ui/frame");
            var topMostFrame = frame.topmost();
            if (topMostFrame) {
                var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;
                if (viewController) {
                    viewController.presentViewControllerAnimatedCompletion(mpMediaPickerController, true, null);
                }
            }
        });
    };

    var listener;

    var MPMediaPickerControllerDelegateImpl = (function (_super) {
        __extends(MPMediaPickerControllerDelegateImpl, _super);
        function MPMediaPickerControllerDelegateImpl() {
            _super.apply(this, arguments);
        }
        MPMediaPickerControllerDelegateImpl.new = function () {
            return _super.new.call(this);
        };
        MPMediaPickerControllerDelegateImpl.prototype.initWithCallback = function (callback) {
            this._callback = callback;
            return this;
        };

        MPMediaPickerControllerDelegateImpl.prototype.mediaPickerDidPickMediaItems = function (picker, mediaItemCollection) {
            if (this._callback) {
                this._callback(mediaItemCollection.items[0].assetURL);
            }

            picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
            listener = null;
        };

        MPMediaPickerControllerDelegateImpl.prototype.mediaPickerDidCancel = function (picker) {
            picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
            listener = null;
        }

        MPMediaPickerControllerDelegateImpl.ObjCProtocols = [MPMediaPickerControllerDelegate];
        return MPMediaPickerControllerDelegateImpl;
    } (NSObject));

    return {
        getPlayer: getPlayer,
        pick: pick,
        pickFromDevice: pickFromDevice
    };
})();

exports.Audio = AudioPlayer;