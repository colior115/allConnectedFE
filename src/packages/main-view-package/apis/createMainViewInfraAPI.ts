import type { ExtensionSlot, Shell, SlotKey } from "repluggable";
import type { ContributedComponent, ContributedProvider, MainViewInfraAPI } from "./mainViewInfraAPI";

export const componentsSlotKey: SlotKey<ContributedComponent> = {
    name: 'contributedComponent',
};

export const providersSlotKey: SlotKey<ContributedProvider> = {
    name: 'contributedProvider',
};

export const createMainViewInfraAPI = (
    shell: Shell,
): {
    api: MainViewInfraAPI;
    componentsSlot: ExtensionSlot<ContributedComponent>;
    providersSlot: ExtensionSlot<ContributedProvider>;
} => {
    const componentsSlot = shell.declareSlot(componentsSlotKey);
    const providersSlot = shell.declareSlot(providersSlotKey);

    const api: MainViewInfraAPI = {
        contributeComponent(fromShell, contribution) {
            componentsSlot.contribute(fromShell, contribution);
        },
        contributeProvider(fromShell, contribution) {
            providersSlot.contribute(fromShell, contribution);
        },
    };

    return { api, componentsSlot, providersSlot };
};
