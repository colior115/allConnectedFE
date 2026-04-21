import type { Shell, SlotKey } from "repluggable";
import type { ContributedComponent, MainViewAPI } from "./mainViewAPI";

export const componentsSlotKey: SlotKey<ContributedComponent> = {
    name: 'contributedComponent',
};

export const createMainViewAPI = (shell: Shell): MainViewAPI => {
    const componentsSlot = shell.declareSlot(componentsSlotKey);

    return {
        contributeComponent(fromShell, contribution) {
            componentsSlot.contribute(fromShell, contribution);
        },
    };
};