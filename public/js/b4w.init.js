/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import b4w from "blend4web";

b4w.register("example_main", function (exports, require) {

  var m_app = require('app');
  // var m_cam = require('camera');
  // var m_cfg = require('config');
  // var m_cont = require('container');
  // var m_ctl = require('controls');
  var m_data = require('data');
  //var m_scenes = require('scenes');
  // var m_time = require('time');
  // var m_trans = require('transform');
  // var m_vec3 = require('vec3');
  // var m_version = require('version');
  //var m_tex = require("textures");

  exports.init = function () {
    m_app.init({
      canvas_container_id: "main_canvas_container",
      callback: init_cb,
      autoresize: !0,
      key_pause_enabled: !1
    });
  }

  function init_cb(canvas_elem, success) {

    if (!success) {
      console.log("b4w init failure");
      return;
    }
    load();
  }

  function load() {
    m_data.load("/models/computer.json", load_cb);
  }

  function load_cb() {
    m_app.enable_camera_controls(false, false, false, null, true);
    // var camobj = m_scenes.get_active_camera();
    // init_camera_animation(camobj);

    // var main_canvas = m_cont.get_canvas();
    // main_canvas.addEventListener("mouseup", main_canvas_up);
    // main_canvas.addEventListener("mousedown", main_canvas_down);
  }
 

})

