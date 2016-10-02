var sphero = require ("sphero")
  orb = sphero("/dev/tty.Sphero-GBR-AMP-SPP")

  var keypress = require("keypress");

  orb.connect(listen);

  function handle(ch, key) {
    var stop = orb.roll.bind(orb, 0, 0),
        roll = orb.roll.bind(orb, 60);

    if (key.ctrl && key.name === "c") {
      process.stdin.pause();
      process.exit();
    }

    if (key.name === "e") {
      orb.startCalibration();
    }

    if (key.name === "q") {
      orb.finishCalibration();
    }

    if (key.name === "up") {
      roll(0);
    }

    if (key.name === "down") {
      roll(180);
    }

    if (key.name === "left") {
      roll(270);
    }

    if (key.name === "right") {
      roll(90);
    }

    if (key.name === "space") {
      stop();
    }

    if (key.name === "m") {
      orb.color("magenta");
    }

    if (key.name === "b") {
      orb.color("blue");
    }

    if (key.name === "g") {
      orb.color("green");
    }
  }

  function listen() {
    keypress(process.stdin);
    process.stdin.on("keypress", handle);

    console.log("starting to listen for arrow key presses");

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
