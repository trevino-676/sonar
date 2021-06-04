import React from "react";

import Settings from "../pages/Settings";
import CompanyPage from "../pages/companies";

export default {
    Settings: {
        component: <Settings />,
        path: "/settings"
    },
    Company: {
        component: <CompanyPage />,
        path: "/companies"
    }
}