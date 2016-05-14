var Observable = require("data/observable").Observable;

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    var Audio = require("~/nativescript-audioplayer/audioplayer").Audio;
    var songPlayer = Audio.getPlayer();
    var songPlayer2 = Audio.getPlayer();

    viewModel.onTap = function () {
        Audio.pickFromDevice().then(function(res) {
            songPlayer2.playLooped(res, 0);
        });
        Audio.pick("~/demo/App_Resources/Android/raw/gg.mp3").then(function (res) {
            songPlayer.play(res);
        },
        function (err) {
            console.log(err);    
        });
    }

    return viewModel;
}

exports.createViewModel = createViewModel;