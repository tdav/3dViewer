"use strict";

b4w.register("cameraControl", function (exports, require) {
  // Constants
  var WEST = "west";
  var NORTHWEST = "northwest";
  var NORTHEAST = "northeast";
  var EAST = "east";
  var SOUTHEAST = "southeast";
  var SOUTHWEST = "southwest";
  var CAMERA_SPEED = 2.5;
  // Modules
  var m_cameraAnimation = require("camera_anim");
  var m_transform = require("transform");
  var _camera;
  var _tracker;


  exports.init = function (objects) {
    if (objects) {
      console.error("There are no objects to load.");
      return;
    }
    objects.forEach(function (obj) {
      switch (obj.type) {
        case "CAMERA":
          _camera = obj;
          break;
        case "EMPTY":
          _tracker = obj;
          break;
      }
    });
    document.addEventListener("keydown", on_keydown);
  };
  
  
  function on_keydown(event) {
    switch (event.keyCode) {
      case 65: // A
        move_tracker(WEST);
        break;
      case 87: // W
        move_tracker(NORTHWEST);
        break;
      case 69: // E
        move_tracker(NORTHEAST);
        break;
      case 68: // D
        move_tracker(EAST);
        break;
      case 88: // X
        move_tracker(SOUTHEAST);
        break;
      case 90: // Z
        move_tracker(SOUTHWEST);
        break;
    }
  }

  
  function move_tracker(direction) {
    var trackerTranslation = m_transform.get_translation(_tracker);
    switch (direction) {
      case WEST:
        trackerTranslation[0] -= 1.732051;
        break;
      case NORTHWEST:
        trackerTranslation[0] -= 0.866025;
        trackerTranslation[1] += 1.5;
        break;
      case NORTHEAST:
        trackerTranslation[0] += 0.866025;
        trackerTranslation[1] += 1.5;
        break;
      case EAST:
        trackerTranslation[0] += 1.732051;
        break;
      case SOUTHEAST:
        trackerTranslation[0] += 0.866025;
        trackerTranslation[1] -= 1.5;
        break;
      case SOUTHWEST:
        trackerTranslation[0] -= 0.866025;
        trackerTranslation[1] -= 1.5;
        break;
    }
    m_transform.set_translation_v(_tracker, trackerTranslation);
    m_cameraAnimation.move_camera_to_point(_camera, _tracker, CAMERA_SPEED);
  }
});
