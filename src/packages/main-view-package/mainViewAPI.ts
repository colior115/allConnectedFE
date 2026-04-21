import type { ReactComponentContributor, Shell, SlotKey } from "repluggable";

export const MainViewAPI: SlotKey<MainViewAPI> = {
    name: 'Main View API',
    public: true,
    layer: 'INFRA',
};

export interface MainViewAPI {
    contributeComponent(
        fromShell: Shell,
        contribution: ContributedComponent,
    ): void;
}

export interface ContributedComponent {
    component: ReactComponentContributor;
}