export const useStore = () => {
  const isOpen = useState("open", () => false);

  return {
    isOpen,
  };
};
