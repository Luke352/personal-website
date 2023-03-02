import CanvasNest from './CanvasNest';

const getScriptConfig = () => {
  const scripts = document.getElementsByTagName('script');
  const len = scripts.length;
  const script = scripts[len - 1]; 
  return {
    zIndex: script.getAttribute('zIndex'),
    opacity: script.getAttribute('opacity'),
    color: script.getAttribute('color'),
    pointColor: script.getAttribute('pointColor'),
    count: Number(script.getAttribute('count')) || 99,
  };
};

new CanvasNest(document.body, getScriptConfig());
