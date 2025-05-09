import {createBrowserRouter} from "react-router";
import MainPage from "../ui/MainPage.tsx";
import Layout from "../ui/Layout.tsx";
import SelectRegion from "../ui/SelectRegion.tsx";
import SelectProgramTarget from "../ui/SelectProgramTarget.tsx";
import SelectProgramType from "../ui/SelectProgramType.tsx";
import SelectInstitution from "../ui/SelectInstitution.tsx";
import SelectConsulting from "../ui/SelectConsulting.tsx";
import ExpertRecommend from "../ui/ExpertRecommend.tsx";

const Router = createBrowserRouter([
    {
        path: '',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: MainPage
            },
            {
                path: '/selectRegion',
                Component: SelectRegion
            }, {
                path: '/selectProgramTarget',
                Component: SelectProgramTarget
            }, {
                path: '/selectProgramType',
                Component: SelectProgramType
            }, {
                path: '/selectInstitution',
                Component: SelectInstitution
            }, {
                path: '/selectConsulting',
                Component: SelectConsulting
            }, {
                path: '/expertRecommend',
                Component: ExpertRecommend
            }
        ]
    }
])

export default Router