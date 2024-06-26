"use client";
import "./ProgressBar.css";

import * as NProgress from "nprogress";
import { useEffect } from "react";

/**
 * Convert the url to Absolute URL based on the current window location.
 * @param url {string}
 * @returns {string}
 */
const toAbsoluteURL = (url: string): string => {
  return new URL(url, window.location.href).href;
};

/**
 * Check if it is hash anchor or same page anchor
 * @param currentUrl {string} Current Url Location
 * @param newUrl {string} New Url detected with each anchor
 * @returns {boolean}
 */
const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
  const current = new URL(toAbsoluteURL(currentUrl));
  const next = new URL(toAbsoluteURL(newUrl));
  return current.href.split("#")[0] === next.href.split("#")[0];
};

/**
 * Check if it is Same Host name
 * @param currentUrl {string} Current Url Location
 * @param newUrl {string} New Url detected with each anchor
 * @returns {boolean}
 */
const isSameHostName = (currentUrl: string, newUrl: string): boolean => {
  const current = new URL(toAbsoluteURL(currentUrl));
  const next = new URL(toAbsoluteURL(newUrl));
  return (
    current.hostname.replace(/^www\./, "") ===
    next.hostname.replace(/^www\./, "")
  );
};

/**
 * Find the closest anchor to trigger
 */
function findClosestAnchor(
  element: HTMLElement | null,
): HTMLAnchorElement | null {
  while (element && element.tagName.toLowerCase() !== "a") {
    element = element.parentElement;
  }
  return element as HTMLAnchorElement;
}

export default function ProgressBar() {
  useEffect(() => {
    let progressBarTimeout: number | null = null;

    function clearProgressBarTimeout() {
      if (progressBarTimeout) {
        clearTimeout(progressBarTimeout);
        progressBarTimeout = null;
      }
    }

    function startProgressBar() {
      clearProgressBarTimeout();
      progressBarTimeout = window.setTimeout(() => {
        NProgress.start();
      }, 200);
    }

    function stopProgressBar() {
      clearProgressBarTimeout();
      NProgress.done();
    }

    /**
     * Check if the Current Url is same as New Url
     */
    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string): boolean {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);
      // Compare hostname, pathname, and search parameters
      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        // Check if the new URL is just an anchor of the current URL page
        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash !== newHash &&
          currentUrlObj.href.replace(currentHash, "") ===
            newUrlObj.href.replace(newHash, "")
        );
      }
      return false;
    }

    const nProgressClass: NodeListOf<HTMLHtmlElement> =
      document.querySelectorAll("html");

    const removeNProgressClass = (): void =>
      nProgressClass.forEach((el: Element) =>
        el.classList.remove("nprogress-busy"),
      );

    function handleClick(event: MouseEvent): void {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        const newUrl = anchor?.href;
        if (newUrl) {
          const currentUrl = window.location.href;
          // const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink =
            (anchor as HTMLAnchorElement).target === "_blank";

          // Check for Special Schemes
          const isSpecialScheme = [
            "tel:",
            "mailto:",
            "sms:",
            "blob:",
            "download:",
          ].some((scheme) => newUrl.startsWith(scheme));

          const isAnchor: boolean = isAnchorOfCurrentUrl(currentUrl, newUrl);
          const notSameHost = !isSameHostName(
            window.location.href,
            anchor.href,
          );
          if (notSameHost) {
            return;
          }
          if (
            newUrl === currentUrl ||
            isAnchor ||
            isExternalLink ||
            isSpecialScheme ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            isHashAnchor(window.location.href, anchor.href) ||
            !toAbsoluteURL(anchor.href).startsWith("http")
          ) {
            startProgressBar();
            stopProgressBar();
            removeNProgressClass();
          } else {
            startProgressBar();
          }
        }
      } catch (err) {
        startProgressBar();
        stopProgressBar();
      }
    }

    /**
     * Complete TopLoader Progress on adding new entry to history stack
     */
    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        stopProgressBar();
        removeNProgressClass();
        return pushState.apply(history, args);
      };
    })((window as Window).history);

    /**
     * Complete TopLoader Progress on replacing current entry of history stack
     */
    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        stopProgressBar();
        removeNProgressClass();
        return replaceState.apply(history, args);
      };
    })((window as Window).history);

    function handlePageHide(): void {
      stopProgressBar();
      removeNProgressClass();
    }

    /**
     * Handle Browser Back and Forth Navigation
     */
    function handleBackAndForth(): void {
      stopProgressBar();
    }

    // Add the global click event listener
    window.addEventListener("popstate", handleBackAndForth);
    document.addEventListener("click", handleClick);
    window.addEventListener("pagehide", handlePageHide);

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("popstate", handleBackAndForth);
    };
  }, []);

  return null;
}
