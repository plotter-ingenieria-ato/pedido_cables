"use client";

import { useCallback, useEffect, useRef } from "react";

export function useNotificationSound() {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {

    audioRef.current = new Audio("/sounds/notificacion.mp3");
    audioRef.current.preload = "auto";
    audioRef.current.volume = 1;

    const desbloquearAudio = () => {

      audioRef.current
        ?.play()
        .then(() => {

          audioRef.current?.pause();

          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }

        })
        .catch(() => {});

      window.removeEventListener("click", desbloquearAudio);

    };

    window.addEventListener("click", desbloquearAudio);

    return () => {

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }

    };

  }, []);

  const playNuevoPedido = useCallback(async () => {

    if (!audioRef.current) return;

    try {

      // Reiniciar cualquier reproducción anterior
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      await audioRef.current.play();

      console.log("Alarma iniciada");

      // Detener automáticamente después de 5 minutos
      timeoutRef.current = setTimeout(() => {

        if (audioRef.current) {

          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.loop = false;

          console.log("Alarma detenida");

        }

      }, 300000); // 300000 ms = 5 minutos

    } catch (e) {

      console.error(e);

    }

  }, []);

  return {
    playNuevoPedido,
  };

}