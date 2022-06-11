import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import * as PhotoSwipe from "photoswipe/dist/photoswipe";
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import React, { useEffect, useRef } from "react";
window.PhotoSwipe = PhotoSwipe;

export const initPhotoSwipe = (wrapper) => {
  const photoSwipeWrapper = document.querySelector(".pswp");
  const thumbnails = wrapper.querySelectorAll("a");

  const clickThumbnail = (e, index) => {
    e.preventDefault();

    const items = [...thumbnails].map((el) => {
      const img = el.querySelector('img');
      const imgSize = el.getAttribute('data-size').split('x');
      const title = el.getAttribute('title');
      const w = Number(imgSize[0]);
      const h = Number(imgSize[1]);
      const src = el.getAttribute('href');
      const msrc = img.getAttribute('src');

      return {
        src,
        msrc,
        w,
        h,
        title: src,
      }
    });

    const options = {
      index,
      addCaptionHTMLFn: function(item, captionEl) {
        if(!item.title) {
          captionEl.children[0].innerHTML = '';
          return false;
        }
        captionEl.children[0].innerHTML = item.title;
        return true;
      },
    };

    const gallery = new PhotoSwipe(
      photoSwipeWrapper,
      PhotoSwipeUI_Default,
      items,
      options
    );
    gallery.init();
  };

  thumbnails.forEach((el, index) => el.addEventListener('click', (e) => clickThumbnail(e, index)));
};

export const PhotoSwipeTemplate = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    initPhotoSwipe(ref.current);

    return () => {
      // @TODO unmount PhotoSwipeTemplate
      console.log("unmount PhotoSwipeTemplate");
    };
  }, []);

  return (
    <div className={"photoswipe"} ref={ref}>
      {children}
    </div>
  );
};
