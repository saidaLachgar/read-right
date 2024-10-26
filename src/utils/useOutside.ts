import { useEffect } from "react";

const useOutside = (ref: React.RefObject<HTMLDivElement>, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // @ts-ignore car il y a un souci de typage entre 'target' et 'ref.current'
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOutside;
