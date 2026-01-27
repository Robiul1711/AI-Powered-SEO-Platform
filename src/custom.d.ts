declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "redux-persist/integration/react" {
  import { ReactNode, Component } from "react";
  import { Persistor } from "redux-persist";

  export interface PersistGateProps {
    persistor: Persistor;
    onBeforeLift?(): void | Promise<void>;
    children?: ReactNode | ((bootstrapped: boolean) => ReactNode);
    loading?: ReactNode;
  }

  export class PersistGate extends Component<PersistGateProps> {}
}
