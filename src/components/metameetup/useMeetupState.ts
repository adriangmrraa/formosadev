"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STEPS } from "../../lib/metameetup";
import {
  clearState,
  defaultState,
  loadState,
  saveState,
  type MeetupState,
  type StorageLike,
} from "../../lib/metameetup-store";

const LAST = STEPS.length - 1;

function storage(): StorageLike | undefined {
  try {
    return typeof window !== "undefined" ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Hydration-safe persisted state: renders defaults on the server/first pass,
 * then replaces them with the stored snapshot on mount and saves every change.
 */
export function useMeetupState() {
  const [state, setState] = useState<MeetupState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [persisted, setPersisted] = useState(true);
  // Set by any mutation before hydration lands — a late loadState must never
  // clobber something the user already did.
  const interacted = useRef(false);

  // Sync with localStorage (an external system) a frame after mount so the
  // static-export HTML and the first client render always match.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setState((current) =>
        interacted.current ? current : loadState(storage())
      );
      setHydrated(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const id = requestAnimationFrame(() => {
      setPersisted(saveState(state, storage()));
    });
    return () => cancelAnimationFrame(id);
  }, [state, hydrated]);

  const update = useCallback((mutate: (draft: MeetupState) => MeetupState) => {
    interacted.current = true;
    setState((s) => mutate(s));
  }, []);

  const goTo = useCallback((index: number) => {
    interacted.current = true;
    const clamped = Math.max(0, Math.min(LAST, index));
    setState((s) => ({
      ...s,
      step: clamped,
      visited: s.visited.includes(clamped) ? s.visited : [...s.visited, clamped],
    }));
  }, []);

  const next = useCallback(() => {
    interacted.current = true;
    setState((s) => {
      const clamped = Math.min(LAST, s.step + 1);
      return {
        ...s,
        step: clamped,
        visited: s.visited.includes(clamped) ? s.visited : [...s.visited, clamped],
      };
    });
  }, []);

  const prev = useCallback(() => {
    interacted.current = true;
    setState((s) => ({ ...s, step: Math.max(0, s.step - 1) }));
  }, []);

  const reset = useCallback(() => {
    interacted.current = true;
    clearState(storage());
    setState(defaultState());
  }, []);

  return { state, hydrated, persisted, update, goTo, next, prev, reset };
}
