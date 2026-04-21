import type { FunctionComponent } from "react";
import { SlotRenderer } from "repluggable";
import type { ExtensionSlot } from "repluggable/dist/src/API";
import type { ContributedComponent } from "./mainViewAPI";

type MainViewComponent = FunctionComponent<{
  slot: ExtensionSlot<ContributedComponent>;
}>;

const slotItemToComp = ({component}: ContributedComponent) => component;

export const MainViewComponent: MainViewComponent = ({slot}) => (
  <div>
    <SlotRenderer slot={slot} mapFunc={slotItemToComp} />
  </div>
);