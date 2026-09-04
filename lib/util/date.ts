import { formatDistanceToNowStrict, format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatRelativeDate(dateString: string | Date): string {
  const targetDate = new Date(dateString);
  const now = new Date();

  // 날짜 차이 계산 (일 기준)
  const dayDiff = differenceInDays(now, targetDate);

  // 7일 이상 지난 게시글은 YYYY. MM. DD. 형식으로 출력
  if (dayDiff >= 7) {
    return format(targetDate, 'yyyy. MM. dd.');
  }

  // 7일 이내는 "방금 전", "3분 전", "2일 전" 등으로 표시
  return formatDistanceToNowStrict(targetDate, {
    addSuffix: true, // "~전" 접미사 붙이기
    locale: ko,      // 한국어
  });
}
