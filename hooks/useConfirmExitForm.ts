"use client";

import { useEffect } from "react";

export function useConfirmExitForm(
  message = "작성 중인 게시글이 있습니다. 페이지를 떠나시겠습니까?",
) {
  useEffect(() => {
    // 새로고침 / 탭 닫기 / 브라우저 종료
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // 브라우저 뒤로가기 / 앞으로가기
    const handlePopState = () => {
      const confirmed = window.confirm(message);

      if (!confirmed) {
        // 취소하면 현재 페이지에 그대로 남음
        window.history.pushState(null, "", window.location.href);
      }
    };

    // 현재 페이지를 history에 하나 추가
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [message]);
}
