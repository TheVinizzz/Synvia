import { create } from 'zustand'

const useUser = create(((set) => ({
    authenticate: false,
    setAuthenticate: (authenticate: boolean) => set(() => ({ authenticate })),
})))

export default useUser