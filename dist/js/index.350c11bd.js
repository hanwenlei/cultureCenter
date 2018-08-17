webpackJsonp([9], {
    48: function (n, e, t) {
        "use strict";
        t(49), $(document).ready(function () {
            function n() {
                var n = $("#team .content");
                n.offset().top - ($(window).height() - n.height()) <= $(window).scrollTop() + 200 && !1 === $("#team .content .item").hasClass("active") && ($("#team .content .item").addClass("active"), $(window).unbind("scroll"))
            }

            window.requestAnimFrame = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n, e) {
                    window.setTimeout(n, 1e3 / 60)
                }
            }(), $(window).scroll(n), setTimeout(function () {
                skrollr.get().refresh()
            }, 1)
        })
    }, 49: function (n, e) {
    }
}, [48]);