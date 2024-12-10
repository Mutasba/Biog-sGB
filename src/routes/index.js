import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../pages/login'
import welcome from '../pages/welcome'
import CriarConta from "../pages/CriarConta"
import Adm from "../pages/Adm"
import TabRoutes from "../pages/Principal/Tab.routes"
import Users from "../pages/Users"
import Settings from "../pages/Settings"
import Status from "../pages/Status"
import Historico from "../pages/Historico"
import Gaveta from "../pages/Gaveta"
const Stack = createNativeStackNavigator();

export default function Routes() {
    return (


        <Stack.Navigator
        >

            <Stack.Screen
                name='welcome'
                component={welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Gaveta'
                component={Gaveta}
                options={{ headerShown: false }}
                independent={true}
            />


            <Stack.Screen
                name='CriarConta'
                component={CriarConta}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Users'
                component={Users}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Adm'
                component={Adm}
                options={{ headerShown: false }}

            />

            <Stack.Screen
                name='Status'
                component={Status}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name='Historico'
                component={Historico}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='TabRoutes'
                component={TabRoutes}
                options={{ headerShown: false }}
                independent={true}
            />

            <Stack.Screen
                name='Settings'
                component={Settings}
                options={{ headerShown: false }}
                independent={true}
            />

        </Stack.Navigator>



    )

}