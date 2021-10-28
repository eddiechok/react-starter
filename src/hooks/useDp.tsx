import { useLayoutEffect, useRef } from 'react';

const useDp = (dp?: number) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // add eventListener for data-filter
  // useLayoutEffect bcos related to DOM
  useLayoutEffect(() => {
    let inputListener: EventListener, keydownListener: EventListener;
    const input = inputRef.current;

    if (dp !== undefined && !!input) {
      const dataFilter = `\\d{0,12}(${dp > 0 && '\\.'}\\d{0,${dp}})?`;
      const state = {
        value: input.value,
        start: input.selectionStart,
        end: input.selectionEnd,
        pattern: RegExp('^' + dataFilter + '$')
      };

      inputListener = () => {
        if (state.pattern.test(input.value)) {
          state.value = input.value;
        } else {
          input.value = state.value;
          if (state.start !== null && state.end !== null) {
            input.setSelectionRange(state.start, state.end);
          }
        }
      };

      keydownListener = () => {
        state.start = input.selectionStart;
        state.end = input.selectionEnd;
      };

      input.addEventListener('input', inputListener);
      input.addEventListener('keydown', keydownListener);
    }
    return () => {
      // remove eventListener when cleanup
      if (dp !== undefined && !!input && inputListener && keydownListener) {
        input.removeEventListener('input', inputListener);
        input.removeEventListener('keydown', keydownListener);
      }
    };
  }, [dp]);

  return inputRef;
};

export default useDp;
