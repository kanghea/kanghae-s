"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * `.rv` 요소가 화면에 들어오면 `.on` 을 붙인다(중개사코치 랜딩의 등장 방식). 경로가 바뀌면 다시 찾는다.
 * 지금 화면 안에 있는 요소는 숨기기 전에 먼저 `.on` 을 줘서, 첫 화면 글자가 사라졌다 나타나지 않게 한다.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.on)"));
    const vh = window.innerHeight;
    const later: HTMLElement[] = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("on");
      else later.push(el);
    }
    if (!("IntersectionObserver" in window)) {
      later.forEach((el) => el.classList.add("on"));
      return;
    }
    root.classList.add("rv-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    later.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
