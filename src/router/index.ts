import { createRouter, createWebHistory } from 'vue-router';
import Home from 'src/pages/Home.vue';
// import About from 'src/pages/About.vue';
import Contact from 'src/pages/Contact.vue';
import BlogList from 'src/pages/BlogList.vue';
import BlogPost from 'src/pages/BlogPost.vue';
import DynamicPage from 'src/components/DynamicPage.vue';
import NotFoundPage from 'src/pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/index.html',
            name: 'dynamic_home',
            component: DynamicPage,
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
        {
            path: '/p/:pathMatch(.*)*',
            name: 'unamed_page',
            component: DynamicPage,
        },
        {
            path: '/page/:pathMatch(.*)*',
            name: 'unamed_page2',
            component: DynamicPage,
        },
        // {
        //     path: '*',
        //     name: 'other_pages',
        //     component: DynamicPage,
        // },
        { path: '/:pathMatch(.*)*', name: 'other_pages', component: DynamicPage },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
        // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
        { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFoundPage },
    ],
});

export default router;
