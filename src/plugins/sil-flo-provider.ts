import type { FontProvider } from "astro";
import type { InitializedProvider } from "unifont";
import silflo from "./sil-flo.mts"

export function silFloProvider(): FontProvider {
  const provider = silflo();
  let initializedProvider: InitializedProvider | undefined;
  return {
    name: provider._name,
    async init(context) {
      initializedProvider = await provider(context);
    },
    async resolveFont({ familyName, ...rest }) {
      return await initializedProvider?.resolveFont(familyName, rest);
    },
    async listFonts() {
      return await initializedProvider?.listFonts?.();
    },
  };
}