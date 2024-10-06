import dynamic from 'next/dynamic';

const PixiComponent = dynamic(() => import('./Home'), { ssr: false });

export default function HomeDyn() {
  return <PixiComponent />;
}
