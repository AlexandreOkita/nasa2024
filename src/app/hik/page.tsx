import dynamic from 'next/dynamic';

const PixiComponent = dynamic(() => import('./MenuStage'), { ssr: false });

export default function MenuStageDyn() {
  return <PixiComponent />;
}
