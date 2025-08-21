import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    index("routes/redirect.tsx"),
    route("overview", "routes/overview.tsx")
] satisfies RouteConfig;
