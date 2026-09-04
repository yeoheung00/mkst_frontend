interface Props {
  size?: string;
  color?: string; // 특정 색상을 강제하고 싶을 때 사용
}

export default function Logo({ size="32px", color = "currentColor" }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill={color}>
      <path d="M 0 0,l 8 8,l 8 -8,h 16,l -32 32,v -16,l 16 16,h 16,l -8 -8,l 8 -8,l -16 -16,v 16,h -16,Z"/>
    </svg>
  );
}
