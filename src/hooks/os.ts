import { useEffect, useState } from "react";

/**
 * ユーザーエージェント判定hook
 * - isIos {boolean} iosかどうか判定(iPad含む)
 * - isAndroid {boolean} androidかどうか判定
 */
export const useOs = () => {
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);

  const ua = navigator.userAgent.toLowerCase();

  useEffect(() => {
    setIsIos(ua.indexOf('iphone') >= 0 || ua.indexOf('ipad') >= 0);
    setIsAndroid(ua.indexOf('android') >= 0);
  }, [ua])

  return {
    isIos,
    isAndroid,
  }
};
