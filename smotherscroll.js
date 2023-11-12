gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

document.addEventListener("DOMContentLoaded", function () {
  if ((ScrollTrigger.isTouch !== 1) && (window.innerWidth > 768)) { // только для ноутбуков и компьютеров
    console.log("im here");
    ScrollSmoother.create({
      wrapper: '.wrapper',
      content: '.content',
      smooth: 1.2,
      effects: true
    })

    let itemsText = gsap.utils.toArray('.head-title')

    itemsText.forEach(item => {
      gsap.fromTo(item, {x: -200 }, {
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: '-600',
          end: '-500',
        }
      })
    })
    

    let itemsL = gsap.utils.toArray('.left-column .gallery-item')

    itemsL.forEach(item => {
      gsap.fromTo(item, {x: -50 }, {
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: '-850',
          end: '-100',
          scrub: true
        }
      })
    })

    let itemsR = gsap.utils.toArray('.right-column .gallery-item')

    itemsR.forEach(item => {
      gsap.fromTo(item, {x: 50 }, {
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: '-750',
          end: 'top',
          scrub: true
        }
      })
    })
  }
})