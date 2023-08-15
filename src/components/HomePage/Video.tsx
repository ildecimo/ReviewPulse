interface VideoProps {
  src: string;
}

export default function Video({ src }: VideoProps) {
  return (
    <video muted autoPlay loop>
      <source src={src} type="video/mp4" />
    </video>
  );
}
