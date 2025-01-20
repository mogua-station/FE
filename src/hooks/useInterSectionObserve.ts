import { useState, useEffect, type RefObject } from "react";

const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" },
) => {
  //감시 대상이 뷰표트에 들어왔을 때의 상태를 감지하는 state
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  //요소가 뷰포트와 교차되면 IntersectionObserver 값이 자동으로 생김
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    //DOM요소
    const node = elementRef?.current;
    //브라우저에서 지원 확인
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    //설정값
    const observerParams = { threshold, root, rootMargin };

    //IntersectionObserver 인스턴스 생성
    const observer = new IntersectionObserver(updateEntry, observerParams);

    //노드 추적 시작
    observer.observe(node);

    return () => {
      //컴포넌트가 사라지면 추적을 종료
      observer.disconnect();
    };
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return entry;
};

export default useIntersectionObserver;
