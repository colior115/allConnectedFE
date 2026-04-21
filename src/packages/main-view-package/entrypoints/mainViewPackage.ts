import React from 'react';
import type { EntryPoint, ExtensionSlot } from "repluggable";
import { MainViewInfraAPI } from "../apis/mainViewInfraAPI";
import { createMainViewInfraAPI } from "../apis/createMainViewInfraAPI";
import { MainViewComponent } from "../components/mainViewComponent";
import type { ContributedComponent, ContributedProvider } from "../apis/mainViewInfraAPI";

let componentsSlot: ExtensionSlot<ContributedComponent>;
let providersSlot: ExtensionSlot<ContributedProvider>;

export const mainViewPackage: EntryPoint[] = [{
    name: "Main-View",
    layer: "INFRA",

    declareAPIs() {
        return [MainViewInfraAPI];
    },

    attach(shell) {
        const result = createMainViewInfraAPI(shell);
        componentsSlot = result.componentsSlot;
        providersSlot = result.providersSlot;
        shell.contributeAPI(MainViewInfraAPI, () => result.api);
    },

    extend(shell) {
        shell.contributeMainView(shell, () =>
            React.createElement(MainViewComponent, { componentsSlot, providersSlot }),
        );
    },
}];
