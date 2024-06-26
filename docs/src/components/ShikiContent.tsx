interface Props {
  html: string;
  className?: string;
}
export default function ShikiContent({ html, className }: Props) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}
