import dpValentinesDayIntro from '../../../assets/video/dp/gc_dp-infographics-intro_valentines-day-variant.mp4';
import dpBaisakhiPosterLowRes from '../../../assets/images/dp/posters/gc_dp-holiday-posters-baisakhi-1080.webp'
import dpBaisakhiPosterHighRes from '../../../assets/images/dp/posters/gc_dp-holiday-posters-baisakhi-1280.webp';
import dpEasterPosterLowRes from '../../../assets/images/dp/posters/gc_dp-holiday-posters-easter-1080.webp';
import dpEasterPosterHighRes from '../../../assets/images/dp/posters/gc_dp-holiday-posters-easter-1280.webp';


const dpHolidayPosters = [
  {
    type: 'video',
    video: dpValentinesDayIntro,
    controls: true,
    loop: true,
    muted: false,
    autoplay: false,
    id: 'dp-valentines-day-intro',
  },
  {
    type: 'image',
    lowRes: dpBaisakhiPosterLowRes,
    highRes: dpBaisakhiPosterHighRes,
    alt: '',
    id: 'dp-baisakhi-poster',
  },
  {
    type: 'image',
    lowRes: dpEasterPosterLowRes,
    highRes: dpEasterPosterHighRes,
    alt: '',
    id: 'dp-easter-poster',
  },

]

export default dpHolidayPosters;