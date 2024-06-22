export const useForceRender = () => {
  const componentKey = useState("key", () => 0);

  const forceRerender = () => {
    componentKey.value += 1;
  };

  return {
    componentKey,
    forceRerender,
  };
};
