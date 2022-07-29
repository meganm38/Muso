import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/LoginView.vue";
import Signup from "../views/auth/SignupView.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylists from "../views/playlists/UserPlaylist.vue";

import { auth } from "../firebase/config";

// route guards
const requireAuth = (to, from, next) => {
	if (auth.currentUser) {
		next();
	} else {
		next({ name: "Login" });
	}
};

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		beforeEnter: requireAuth,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/signup",
		name: "Signup",
		component: Signup,
	},
	{
		path: "/playlists/create",
		name: "CreatePlaylist",
		component: CreatePlaylist,
		beforeEnter: requireAuth,
	},
	{
		path: "/playlists/:id",
		name: "PlaylistDetails",
		component: PlaylistDetails,
		beforeEnter: requireAuth,
		props: true,
	},
  {
		path: "/playlists/user",
		name: "UserPlaylists",
		component: UserPlaylists,
		beforeEnter: requireAuth,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
