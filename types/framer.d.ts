declare module "framer" {
  export const ControlType: Record<string, string>;
  export function addPropertyControls(component: unknown, controls: unknown): void;
  export function useIsStaticRenderer(): boolean;
}
