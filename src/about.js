import "./styles/about.css";
import Glide from '@glidejs/glide'

new Glide('.slider', {
    perView: 3,
    peek: {
        before: 88,
        after: 88
    },
    classes: {
        swipeable: 'glide--swipeable',
        dragging: 'glide--dragging',
        direction: {
          ltr: 'glide--ltr',
          rtl: 'glide--rtl'
        },
        type: {
          slider: 'glide--slider',
          carousel: 'glide--carousel'
        },
        slide: {
          clone: 'glide__slide--clone',
          active: 'glide__slide--active'
        },
        arrow: {
          disabled: 'glide__arrow--disabled'
        },
        nav: {
          active: 'pagination__point_active'
        }
      }
}).mount()

