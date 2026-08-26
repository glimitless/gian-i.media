import dpWinter25InfographicsIntro from '../../../assets/video/dp/gc_dp-infographics-intro.mp4';
import dpWinter25InfographicsCageInfoLowRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-cage-info-1080.webp';
import dpWinter25InfographicsCageInfoHighRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-cage-info-2160.webp';
import dpWinter25InfographicsAccessLowRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-access-1080.webp';
import dpWinter25InfographicsAccessHighRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-access-2160.webp';
import dpWinter25InfographicsResourcesLowRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-resources-1080.webp';
import dpWinter25InfographicsResourcesHighRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-resources-2160.webp';
import dpWinter25InfographicsTeamLowRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-team-1080.webp';
import dpWinter25InfographicsTeamHighRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-team-2160.webp';
import dpWinter25InfographicsFineLowRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-fine-1080.webp';
import dpWinter25InfographicsFineHighRes from '../../../assets/images/dp/posters/gc_dp-infographics-winter-25-fine-2160.webp';

const dpInfographicsWinter25 = [
  {
    type: 'video',
    video: dpWinter25InfographicsIntro,
    controls: true,
    loop: true,
    muted: false,
    autoplay: false,
    id: 'dp-winter-25-infographics-intro',
  },
  {
    type: 'image',
    lowRes: dpWinter25InfographicsCageInfoLowRes,
    highRes: dpWinter25InfographicsCageInfoHighRes,
    alt: '',
    id: 'dp-winter-25-infographics-cage-info',
  },
  {
    type: 'image',
    lowRes: dpWinter25InfographicsAccessLowRes,
    highRes: dpWinter25InfographicsAccessHighRes,
    alt: '',
    id: 'dp-winter-25-infographics-access',
  },
  {
    type: 'image',
    lowRes: dpWinter25InfographicsResourcesLowRes,
    highRes: dpWinter25InfographicsResourcesHighRes,
    alt: '',
    id: 'dp-winter-25-infographics-resources',
  },
  {
    type: 'image',
    lowRes: dpWinter25InfographicsTeamLowRes,
    highRes: dpWinter25InfographicsTeamHighRes,
    alt: '',
    id: 'dp-winter-25-infographics-team',
  },
  {
    type: 'image',
    lowRes: dpWinter25InfographicsFineLowRes,
    highRes: dpWinter25InfographicsFineHighRes,
    alt: '',
    id: 'dp-winter-25-infographics-fine',
  },
];

export default dpInfographicsWinter25;