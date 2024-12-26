import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
// import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import BlogList from '../pages/BlogList.vue';
import BlogPost from '../pages/BlogPost.vue';
import DynamicPage from '../components/DynamicPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        //
        // {
        //   path: '/about',
        //   name: 'about',
        //   component: About
        // },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            path: '/blog',
            name: 'blog',
            component: BlogList,
        },
        {
            path: '/blog/:id',
            name: 'blog-post',
            component: BlogPost,
        },
        // Dynamic routes
        {
            path: '/about-us',
            name: 'about-us',
            component: DynamicPage,
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: DynamicPage,
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            component: DynamicPage,
        },
    ],
});

export default router;
