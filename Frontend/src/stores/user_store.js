import { create } from "zustand";

const userStore = create((set) => ({
  //   bears: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
  email: "",
  bookmarks: [],
  id: "",
  tier: 0,
  setUserData: (email, bookmarks, id, tier) =>
    set({ email: email, bookmarks: bookmarks, id: id, tier: tier }),
}));

export default userStore;
