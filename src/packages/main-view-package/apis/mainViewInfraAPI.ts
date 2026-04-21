import type { ReactNode } from "react";
import type { ReactComponentContributor, Shell, SlotKey } from "repluggable";

export const MainViewInfraAPI: SlotKey<MainViewInfraAPI> = {
    name: 'Main View Infra API',
    public: true,
    layer: 'INFRA',
};

export interface MainViewInfraAPI {
    contributeComponent(fromShell: Shell, contribution: ContributedComponent): void;
    contributeProvider(fromShell: Shell, contribution: ContributedProvider): void;
}

export interface ContributedComponent {
    component: ReactComponentContributor;
}

export type ReactProviderContributor = (children: ReactNode) => ReactNode;

export interface ContributedProvider {
    provider: ReactProviderContributor;
}
