import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  index('routes/redirect.tsx'),
  route('overview', 'routes/overview.tsx'),
  route('devices', 'routes/devices.tsx')
] satisfies RouteConfig;
