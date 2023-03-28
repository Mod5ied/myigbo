import { createRouter, createWebHistory } from "vue-router";
import { authService } from "../../services/auth.service";
import Loader from "../components/Interactive/Loader.vue";
import { Role } from "../../helpers/roles";
//dynamic routing.
const Admin = () => import("../../admin/Admin.vue");
const Register = () => import("../../entry/_dash.vue");
const Search = () => import("../components/Search/Search.vue");
const Dictionary = () => import("../components/Dictionary/Dictionary.vue");
const ErrorPage = () => import("../components/Interactive/FourOhFour.vue");
const Learn = () => import("../components/Interactive/Learn/learnIgbo.vue");

const routes = [
	{ path: "/", name: "Loader", component: Loader },
	
	{ path: "/search", name: "Search", component: Search },
	// { path: "/search", name: "Search", component: Search, meta: { authorize: [Role.User] } },
	
	// { path: "/admin", name: "Admin", component: Admin },
	{ path: "/admin", name: "Admin", component: Admin, meta: { authorize: [Role.Admin] } },
	
	// { path: "/learn", name: "Learn", component: Learn, meta: { authorize: [] } },
	{ path: "/learn", name: "Learn", component: Learn },

	{ path: "/register", name: "Register", component: Register },
	
	// { path: "/dictionary", name: "Dictionary", component: Dictionary, meta: { authorize: [Role.User] } },
	{ path: "/dictionary", name: "Dictionary", component: Dictionary },
	
	// { path: "/dictionary", name: "Dictionary", component: Dictionary },
	{ path: "/:catchAll(.*)", name: "NotFound", component: ErrorPage },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
	const { authorize } = to.meta;
	const currentUser = authService.currentUserValue;
	if (authorize) {
		if (!currentUser) {
			// not logged in so redirect to login page with the return url.
			return next({ path: "/register", query: { returnUrl: to.path } });
		}
		// check if route is restricted by role
		if (authorize.length && !authorize.includes(currentUser.user.role)) {
			// role not authorized so redirect to home page.
			return next({ path: "/search" });
		}
	}

	next();
});

export { router };
