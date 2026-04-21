import type { ReactNode, FunctionComponent } from "react";
import { SlotRenderer } from "repluggable";
import type { ExtensionSlot } from "repluggable/dist/src/API";
import type { ContributedComponent, ContributedProvider } from "../apis/mainViewInfraAPI";

type MainViewComponentProps = {
  componentsSlot: ExtensionSlot<ContributedComponent>;
  providersSlot: ExtensionSlot<ContributedProvider>;
};

const slotItemToComp = ({ component }: ContributedComponent) => component;

export const MainViewComponent: FunctionComponent<MainViewComponentProps> = ({
  componentsSlot,
  providersSlot,
}) => {
  const providers = providersSlot.getItems().map(item => item.contribution.provider);

  const content = (
    <div>
      <SlotRenderer slot={componentsSlot} mapFunc={slotItemToComp} />
    </div>
  );

  return <>{providers.reduceRight<ReactNode>((children, wrap) => wrap(children), content)}</>;
};
