var AudioPlayer = (function () {
    var types = require("utils/types");

    var Player = (function () {
        function Player() {
            this.player = new AVAudioPlayer();
        }
        Player.prototype.play = function (resourceUrl) {
            if(!types.isString(resourceUrl)) {
                resourceUrl = NSURL.fileURLWithPath(resourceUrl);    
            }
            
            this.player.initWithContentsOfURLError(resourceUrl);
            this.player.prepareToPlay();
            this.player.play();
        };
        Player.prototype.stop = function () {
            this.player.stop();
        };
        Player.prototype.reset = function () {
            this.player.stop();
            this.player.prepareToPlay();
            this.player.currentTime = 0;
        };
        return Player;
    })();

    var player = new Player();

    // returns resource relative Url
    function pick(relativeURL) {
        return new Promise(function (resolve, reject) {
            var fs = require("file-system");

            var path = types.isString(source) ? source.trim() : "";

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
        Player: player,
        pick: pick,
        pickFromDevice: pickFromDevice
    };
})();

exports.Audio = AudioPlayer;