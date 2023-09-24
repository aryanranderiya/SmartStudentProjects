const tl = gsap.timeline()
tl.to("#fb-like", .3, {rotate: 25, scale: .8, ease: Power1.easeOut})
tl.to("#hand-wrapper", .3, {delay: -.3, rotate: 5, y: 10, x: 5, ease: Back.easeOut})
tl.to("#thumb", .6, {delay: -.3, morphSVG: "#thumb-morph", ease: Power3.easeOut})
tl.to("#fb-like", .6, {delay: -.15, rotate: -25, scale: 1.2, ease: Back.easeOut})
tl.to("#hand-wrapper", .3, {delay: -.6, rotate: -10, y: -5, x: -15, ease: Back.easeOut})
tl.to("#thumb", .3, {delay: -.6, morphSVG: {shape: "#thumb", shapeIndex: 8}, ease: Power1.easeOut})
tl.to("#fb-like", .6, {delay: -.15, rotate: 0, scale: 1, ease: Back.easeOut})
tl.to("#hand-wrapper", .3, {delay: -.6, rotate: 0, y: 0, x: 0})
tl.pause()

$("#btnOff").on("click", () => {
  tl.play()
  $("#btnOff").css({opacity: 0, "pointer-events": "none"})
  $("#btnOn").css({opacity: 1})
  $("body").css({background: "#9bd1fd"})
  
  setTimeout(function() {
    tl.progress(0)
    tl.pause();
    $("#btnOff").css({"pointer-events": "none"})
    $("#btnOn").css({"pointer-events": "all"})
  }, 1500)
})

$("#btnOn").on("click", () => {
  $("#btnOff").css({opacity: 1, "pointer-events": "all"})
  $("#btnOn").css({opacity: 0, "pointer-events": "none"})
  $("body").css({background: "#f0f3fb"})
})

$("#wrapper").on("mouseenter", () => {
  $("#wrapper").css({transform: "scale(1.2)"})
})

$("#wrapper").on("mouseleave", () => {
  $("#wrapper").css({transform: "scale(1)"})
})