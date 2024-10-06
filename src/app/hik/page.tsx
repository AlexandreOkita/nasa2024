import dynamic from 'next/dynamic';

const PixiComponent = dynamic(() => import('../hik/MenuStage'), { ssr: false });

export default function MenuStage() {
  return <PixiComponent />;
}
