import type { EntryPoint } from "repluggable";
import { AllConnectedServerSdkAPI } from "../common-services";

export const allConnectedServerSdkPackage: EntryPoint[] = [{
    name: "ALL_CONNECTED_BE_SDK",
    layer: "INFRA",
    
    declareAPIs() {
        return [AllConnectedServerSdkAPI];
    },

    attach(shell) {
        shell.contributeAPI(AllConnectedServerSdkAPI, () => createAllConnectedServerSdkAPI());
    },

}]