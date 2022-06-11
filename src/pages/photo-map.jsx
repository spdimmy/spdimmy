import React, { useEffect } from "react";
import { useRef } from "react";
import ReactDOMServer from "react-dom/server";
import styles from "./photo-map.module.scss";
import useScript from "../hooks/useScript";
import {
  PhotoSwipeTemplate,
  initPhotoSwipe,
} from "../components/photoswipe/photoswipe";
import SwiperTemplate from "../components/swiper/swiper-template";
import config from "../env.js";
const {gMapsKey} = config;

const swiperConfig = {
  slidesPerView: "auto",
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
    draggable: true },
};

const POINTS_LIST = {
  HOME_1: "home_1",
  HOME_2: "home_2",
  HOME_3: "home_3",
  BABUSHKA: "babushka",
  COMBINED_HEAT_POWER: "combined_heat_power",
  NICE_CENTER: "nice_center",
  ENERGY_SALES_DEPARTMENT: "energy_sales_department",
  ETERNAL_FIRE: "eternal_fire",
  METRO_STATIONS: "metro_stations",
  SQ_MARKSA: "sq_marksa",
  SQ_KALININA: "sq_kalinina",
  SQ_LENINA: "sq_lenina",
  PUB_HARATS: "pub_harats",
  PUB_OLD_PRAGUE: "pub_old_prague",
  RED_AVENUE: "red_avenue",
  YOUNG_SPECTATOR_S_THEATRE: "young_spectator_s_theatre",
  WALK_CENTER_HOME: "walk_center_home",
};

const cityPoints = [
  {
    id: POINTS_LIST.SQ_LENINA,
    coord: [55.03018417312633, 82.92079484261474],
    article: {
      title: POINTS_LIST.SQ_LENINA,
      description: (
        <>
          <p>Main center</p>
          <p>Tro lol llo</p>
        </>
      ),
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221533.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221533_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221452.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221452_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221557.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221557_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221645.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221645_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221739.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221739_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "607",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221814.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221814_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221855.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221855_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221933.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_LENINA}/sq_lenina_IMG_20211204_221933_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.HOME_1,
    coord: [54.96289227275351, 82.95334514853853],
    article: {
      title: POINTS_LIST.HOME_1,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223330.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223330_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223434.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223434_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223454.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_1}/home_1_IMG_20211204_223454_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.HOME_2,
    coord: [55.05585917065129, 82.89106155876284],
    article: {
      title: POINTS_LIST.HOME_2,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "607",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223543.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223543_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223610.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223610_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "607",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223629.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223629_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223654.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_2}/home_2_IMG_20211204_223654_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.HOME_3,
    coord: [55.040066800800815, 82.93031515301378],
    article: {
      title: POINTS_LIST.HOME_3,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223721.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223721_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223751.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223751_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223810.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.HOME_3}/home_3_IMG_20211204_223810_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.BABUSHKA,
    coord: [54.98989318198625, 82.82601026999176],
    article: {
      title: POINTS_LIST.BABUSHKA,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_220950.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_220950_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_222948.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_222948_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_223012.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.BABUSHKA}/babushka_IMG_20211204_223012_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.NICE_CENTER,
    coord: [55.026884253222526, 82.9172889256589],
    article: {
      title: POINTS_LIST.NICE_CENTER,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_223925.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_223925_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_223955.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_223955_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_224019.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_224019_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_224053.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.NICE_CENTER}/nice_center_IMG_20211204_224053_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.PUB_OLD_PRAGUE,
    coord: [55.040181673015454, 82.91807816103243],
    article: {
      title: POINTS_LIST.PUB_OLD_PRAGUE,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.PUB_OLD_PRAGUE}/pub_old_prague_IMG_20211204_224250.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.PUB_OLD_PRAGUE}/pub_old_prague_IMG_20211204_224250_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.RED_AVENUE,
    coord: [55.032891136394035, 82.91964187817865],
    article: {
      title: POINTS_LIST.RED_AVENUE,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.RED_AVENUE}/red_avenue_IMG_20211204_221104.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.RED_AVENUE}/red_avenue_IMG_20211204_221104_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.RED_AVENUE}/red_avenue_IMG_20211204_221218.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.RED_AVENUE}/red_avenue_IMG_20211204_221218_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.ENERGY_SALES_DEPARTMENT,
    coord: [55.04557523234274, 82.92865138352481],
    article: {
      title: POINTS_LIST.ENERGY_SALES_DEPARTMENT,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.ENERGY_SALES_DEPARTMENT}/energy_sales_department_IMG_20211204_223150.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.ENERGY_SALES_DEPARTMENT}/energy_sales_department_IMG_20211204_223150_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.SQ_KALININA,
    coord: [55.05938232378153, 82.9131117443304],
    article: {
      title: POINTS_LIST.SQ_KALININA,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_KALININA}/sq_kalinina_IMG_20211204_221411.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_KALININA}/sq_kalinina_IMG_20211204_221411_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.ETERNAL_FIRE,
    coord: [54.987202031420864, 82.8795294133089],
    article: {
      title: POINTS_LIST.ETERNAL_FIRE,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.ETERNAL_FIRE}/eternal_fire_IMG_20211204_223214.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.ETERNAL_FIRE}/eternal_fire_IMG_20211204_223214_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.ETERNAL_FIRE}/eternal_fire_IMG_20211204_223249.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.ETERNAL_FIRE}/eternal_fire_IMG_20211204_223249_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.COMBINED_HEAT_POWER,
    coord: [55.00443608990508, 82.86911971988151],
    article: {
      title: POINTS_LIST.COMBINED_HEAT_POWER,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "607",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.COMBINED_HEAT_POWER}/combined_heat_power_IMG_20211204_223037.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.COMBINED_HEAT_POWER}/combined_heat_power_IMG_20211204_223037_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.YOUNG_SPECTATOR_S_THEATRE,
    coord: [55.02461407360446, 82.92783541887431],
    article: {
      title: POINTS_LIST.YOUNG_SPECTATOR_S_THEATRE,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.YOUNG_SPECTATOR_S_THEATRE}/young_spectator_s_theatre_IMG_20211105_185640.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.YOUNG_SPECTATOR_S_THEATRE}/young_spectator_s_theatre_IMG_20211105_185640_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.SQ_MARKSA,
    coord: [54.98262809256951, 82.89690370549783],
    article: {
      title: POINTS_LIST.SQ_MARKSA,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.SQ_MARKSA}/sq_marksa_IMG_20211204_222021.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.SQ_MARKSA}/sq_marksa_IMG_20211204_222021_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.METRO_STATIONS,
    coord: [54.98291217699493, 82.88879648660217],
    article: {
      title: POINTS_LIST.METRO_STATIONS,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.METRO_STATIONS}/metro_stations_IMG_20211204_223835.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.METRO_STATIONS}/metro_stations_IMG_20211204_223835_thumbnail.jpg`,
        },
      ],
    },
  },
  {
    id: POINTS_LIST.PUB_HARATS,
    coord: [55.0295335185051, 82.9169622562427],
    article: {
      title: POINTS_LIST.PUB_HARATS,
      description: "My home 1",
      images: [
        {
          title: "title",
          alt: "image",
          width: "608",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224121.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224121_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "1920",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224143.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224143_thumbnail.jpg`,
        },
        {
          title: "title",
          alt: "image",
          width: "607",
          height: "1080",
          src: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224220.jpg`,
          thumbnail: `./images/nsk/${POINTS_LIST.PUB_HARATS}/pub_harats_IMG_20211204_224220_thumbnail.jpg`,
        },
      ],
    },
  },
];

const centerWalkCoordinates = [
  [55.03147929377486, 82.91607037268605],
  [55.048208956310646, 82.91147726809943],
  [55.04626158996633, 82.90386052550103],
  [55.052797956962166, 82.89587969674709],
  [55.055144415328144, 82.89053247361561],
];

const walkPoints = {
  id: POINTS_LIST.WALK_CENTER_HOME,
  coord: centerWalkCoordinates,
  article: {
    title: <h2>WALK_CENTER_HOME</h2>,
    description: (
      <>
        <h3>La la la bla bla</h3>
        <p>centerWalkCoordinates WALK_CENTER_HOME</p>
      </>
    ),
    images: [
      {
        title: "title",
        alt: "image",
        width: "608",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222051.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222051_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222129.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222129_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222204.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222204_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222223.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222223_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222256.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222256_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222449.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222449_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222519.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222519_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222542.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222542_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222623.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222623_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222649.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222649_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222731.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222731_thumbnail.jpg`,
      },
      {
        title: "title",
        alt: "image",
        width: "1920",
        height: "1080",
        src: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222808.jpg`,
        thumbnail: `./images/nsk/${POINTS_LIST.WALK_CENTER_HOME}/walk_center_home_IMG_20211204_222808_thumbnail.jpg`,
      },
    ],
  },
};

export const PhotoMap = () => {
  const markers = [];
  const google = useRef(window.google);
  let map;
  let infowindow;
  let bounds;
  let currentOpenPoint = null;
  let currentHoverPoint = null;

  const wrapperRef = useRef(null);

  useScript(
    `https://maps.googleapis.com/maps/api/js?key=${gMapsKey}&callback=initMap`
  );

  function initMap() {
    google.current = window.google; // ???
    const gMaps = google.current.maps;
    bounds = new gMaps.LatLngBounds();
    infowindow = new gMaps.InfoWindow();

    // Add map
    map = new gMaps.Map(document.getElementById("map"), {
      mapTypeId: google.current.maps.MapTypeId.ROADMAP,
    });

    // Add walk path on map
    const centerWalkPath = new gMaps.Polyline({
      path: walkPoints.coord.map(
        (row) => new gMaps.LatLng(row[0], row[1])
      ),
      id: walkPoints.id,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });

    markers.push(centerWalkPath);

    centerWalkPath.setMap(map);

    // Add Click for walk path
    google.current.maps.event.addListener(
      centerWalkPath,
      "click",
      (function (polyline) {
        return function (e) {
          console.log("centerWalkPath click", polyline);
          infowindow.setContent(
            ReactDOMServer.renderToString(modalContent(walkPoints.article))
          );
          infowindow.setPosition(e.latLng);
          infowindow.open(map, polyline);
        };
      })(centerWalkPath)
    );

    // Add points on map
    cityPoints.forEach(({ id, coord, article }) => {
      const marker = new gMaps.Marker({
        position: new gMaps.LatLng(coord[0], coord[1]),
        map: map,
        id,
      });

      bounds.extend(marker.position);

      google.current.maps.event.addListener(
        marker,
        "click",
        (function (marker) {
          return function () {
            console.log("marker click");
            infowindow.setContent(
              ReactDOMServer.renderToString(modalContent(article))
            );
            infowindow.open(map, marker);
            map.setZoom(15);
            map.setCenter(marker.getPosition());

            currentOpenPoint = marker;
          };
        })(marker)
      );

      markers.push(marker);
    });

    google.current.maps.event.addListener(infowindow, "domready", () => {
      new window.Swiper(".swiper-modal:not(.swiper-initialized)", swiperConfig);

      initPhotoSwipe(document.querySelector(".g-modal"));
    });

    map.fitBounds(bounds);
  }
  window.initMap = initMap;

  const modalContent = ({ title, description, images }) => {
    return (
      <div className={`${styles.photoMap_pointPopUp} g-modal`}>
        <h2>#{title}</h2>
        <div>{description}</div>
        <div>
          <PhotoSwipeTemplate>
            <SwiperTemplate config={swiperConfig}>
              {images.map(
                ({ src, alt, title, width, height, thumbnail }, i) => (
                  <figure key={i}>
                    <a
                      href={src}
                      title={title}
                      data-size={`${width}x${height}`}
                    >
                      <img src={thumbnail} alt={alt} />
                    </a>
                  </figure>
                )
              )}
            </SwiperTemplate>
          </PhotoSwipeTemplate>
        </div>
      </div>
    );
  };

  const handleClickGalleryMarker = (id) => {
    const activeMarker = markers.find((marker) => marker.id === id);

    // if (activeMarker === currentOpenPoint) return;

    map.setZoom(15);
    map.setCenter(activeMarker.getPosition());

    infowindow.setContent(
      ReactDOMServer.renderToString(
        modalContent([...cityPoints, walkPoints].find((point) => point.id === id).article)
      )
    );
    infowindow.open(map, activeMarker);

    currentOpenPoint = activeMarker;
  };

  const handleMouseEnterGalleryMarker = (id) => {
    const activeMarker = markers.find((marker) => marker.id === id);

    console.log(activeMarker);

    activeMarker.setIcon({
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAArCAMAAAC+cAPKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAexQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhqoYNAAAAKR0Uk5TAAMXSHak0uYZbNDg6PD3+wtCndz64b2bemtiuupWQC0bEwVaxO3FeS/uwzGrv1kPCQ4RiuLTaQQlPU7xAZnf+Pym77L59unKe8fZZyAN82Bv7FAUUdZNJ6GfHrkzEIE+2Cj1ZBhw4xICJv2AK10qIbX0oErGcd7OWAc0LI8aOlyRyAYWQZZ+yVQ4qmrbCJg1UrsdfX8yp/5PCuXyk4epwpxDaHyaUi/qAAACv0lEQVR4nN2SeT+iURTHT1FIZKk0tAkxk5RKizKReiK7hLKHJGXJRFmyTNbs+27wRueWZWrGK5jzz/2d+30+53fOPQ/A/xM4fEIigZhEJCQm4HHxKDmFlEpOS6ekp5FTSSnJMSQjMyubSqPnML4wcug0anZWZsY7wufmMck5LDaHm8/lsFk5ZGZeLv4V8QoKi/jFJe8uuJJi/tdvBbxoIigtEpaJIkpcLo4cojJhUakgoiRSWYVcAaBQqli5LJUyIuUVMqkEsUqiWsoFjVhQ9V1brf1eJRBrgCtVEysRq9HVslE5VbbegMkwgz5bhQqza3U1yNpIqcsHjbKeampobGpsMFHrlRrIr6MYcaA0NbfgAN9qaGs34wBnbm8ztOIB19JsUkKHzNIJ0NWtt9o0yEFjs+q7uwA6LbIOYGA9KoBevkHeF52oT27g9wKoejAG9DPzBhArjGGFiA3kMftBnjSIuh0i6K3caE2uVU8YQpMNJskhgWYf5sHIqN3RMeYE51iHwz46ArxhOy0Bxi2uCdSX20jheyanJj18itGN+p5wWcZBMz3jRW+XMeugak0/TFqqYxYtSOCdmUYWvrl5P/IJLEyrXdUu9fRCAF365+d8yH2xPn1pGZ0BW3AlZSVoCyC9vJRevxhZzCq25o+2vy75KVmPKv8athpdV4iu28DH/T34DR09FFVNm7St7Ti2vUXbbHqVO7uYlxuDuF5sd+dNB8Jze+H9D7Qf3psLB94zzoGBeKh4SxSHRMMB5+NL59Ge/djsfNXmY/vekfOPw8mpa+bMHJXmsxnX6UmMu+L84pJ8VY5U+RX58uJcEcPgOkSiCIMKUASFFFLoOm4iEHlubu/c4L67vfGI4hE4JffMVN+5L5V5L3HC33DqQff461H3MPUPQvFEV2vV9KdPCIrnefv88+cIxC+PL+KY/DdeAZ/9wYiI0wAAAABJRU5ErkJggg==",
      size: new window.google.maps.Size(27, 43),
    });

    currentHoverPoint = activeMarker;
  };

  const handleMouseLeaveGalleryMarker = () => {
    currentHoverPoint.setIcon({
      url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png",
      size: new window.google.maps.Size(27, 43),
    });
  };

  const handleResetZoom = () => {
    map.fitBounds(bounds);
  };

  return (
    <div className={styles.photoMap}>
      <div className={styles.photoMap_map}>
        <div id="map" className={styles.photoMap_mapCanvas} />
        <div className={styles.photoMap_mapResetZoom} onClick={handleResetZoom}>
          Reset Zoom
        </div>
      </div>
      <div className={styles.photoMap_gallery}>
        <PhotoSwipeTemplate>
          <SwiperTemplate config={swiperConfig}>
            {[...cityPoints, walkPoints]
              .reduce(
                (acc, point) => [
                  ...acc,
                  ...point.article.images.map((image) => ({
                    ...image,
                    id: point.id,
                  })),
                ],
                []
              )
              .map((el, i) => (
                <div
                  onMouseEnter={() => handleMouseEnterGalleryMarker(el.id)}
                  onMouseLeave={() => handleMouseLeaveGalleryMarker()}
                  key={i}
                >
                  <i
                    className={styles.photoMap_mapMarker}
                    onClick={() => handleClickGalleryMarker(el.id)}
                  >
                    map
                  </i>
                  <figure>
                    <a
                      href={el.src}
                      title={el.title}
                      data-size={`${el.width}x${el.height}`}
                    >
                      <img src={el.thumbnail} alt={el.alt} />
                    </a>
                  </figure>
                </div>
              ))}
          </SwiperTemplate>
        </PhotoSwipeTemplate>
      </div>
    </div>
  );
};
