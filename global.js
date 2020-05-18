// Change "{}" to your options:
// https://github.com/sampotts/plyr/#options

// Expose player so it can be used from the console
let player = null;
let timer = null;

$(document).ready(() => {
  $(".item").on({
    mouseenter: function() {
      if (player !== null) {
        player.destroy();
        player = null;
      }

      const videoFile = $(this).data("video");
      $(this).prepend(`<div id="player-container">
      <video id="player">
        <source
          src="http://shaunlwm.me/static/${videoFile}.mp4"
          type="video/mp4"
        />
      </video>
    </div>`);
      player = new Plyr("#player", {
        hideControls: true,
        displayDuration: false
      });

      const controls = $(this).find(".item-controls");
      controls.css("visibility", "visible");
      controls.fadeIn("fast");
      timer = setTimeout(() => {
        controls.fadeOut("slow");
        $(this)
          .find(".item-thumbnail")
          .css("visibility", "hidden");
        $(this)
          .find("#player-container")
          .css("visibility", "visible");
        player.play();
      }, 2000);
    },
    mouseleave: function() {
      if (timer !== null) clearTimeout(timer);
      timer = null;
      $(this)
        .find("#player-container")
        .remove();
      $(this)
        .find(".item-thumbnail")
        .css("visibility", "visible");
      $(this)
        .find(".item-controls")
        .css("visibility", "hidden");
      if (player !== null) player.destroy();
      player = null;
    }
  });
});
