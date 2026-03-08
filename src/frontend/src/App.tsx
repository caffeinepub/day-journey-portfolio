import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { HomePage } from "./components/pages/HomePage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { SkillsPage } from "./components/pages/SkillsPage";

// ─── Root layout route ─────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0f172a" }}
    >
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

// ─── Page routes ───────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const skillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skills",
  component: SkillsPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

// ─── Route tree ────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  skillsRoute,
  projectsRoute,
  contactRoute,
]);

// ─── Router ────────────────────────────────────────────────────────
const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
});

// ─── Type registration ─────────────────────────────────────────────
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
