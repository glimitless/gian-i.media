import type { SvgIcon } from "@/types/svg";

import ad from '@/public/svg/thumbnails/gc_ad-thumbnail.svg';
import sc from '@/public/svg/thumbnails/gc_sc-thumbnail.svg';
import ss from '@/public/svg/thumbnails/gc_ss-thumbnail.svg';
import tuts from '@/public/svg/thumbnails/gc_tuts-thumbnail.svg';
import dp from '@/public/svg/thumbnails/gc_dp-thumbnail.svg';
import bhd from '@/public/svg/thumbnails/gc_bhd-thumbnail.svg';
import scyu from '@/public/svg/thumbnails/gc_scyu-thumbnail.svg';
import vs from '@/public/svg/thumbnails/gc_vs-thumbnail.svg';
import dtw from '@/public/svg/thumbnails/gc_dtw-thumbnail.svg';
import egl from '@/public/svg/thumbnails/gc_egl-thumbnail.svg';
import b from '@/public/svg/thumbnails/gc_b-thumbnail.svg';

export const thumbnailByFilename: Record<string, SvgIcon> = {
  'gc_ad-thumbnail.svg' : ad,
  'gc_sc-thumbnail.svg' : sc,
  'gc_ss-thumbnail.svg' : ss,
  'gc_tuts-thumbnail.svg' : tuts,
  'gc_dp-thumbnail.svg' : dp,
  'gc_bhd-thumbnail.svg' : bhd,
  'gc_scyu-thumbnail.svg' : scyu,
  'gc_vs-thumbnail.svg' : vs,
  'gc_dtw-thumbnail.svg' : dtw,
  'gc_egl-thumbnail.svg' : egl,
  'gc_b-thumbnail.svg' : b,
};