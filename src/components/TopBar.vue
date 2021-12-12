<template>
    <header class="z-201 py-4 px-6 bg-white shadow-md dark:bg-gray-800">
        <div class="container flex items-center justify-between h-full mx-auto text-purple-600 dark:text-purple-300">
            <!-- hamburger/menu -->
            <button
                @click="emitter.emit('toggle-sidebar')"
                class="p-1 mr-5 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple flex justify-center"
            >
                <i class="icon-menu" />
            </button>

            <!-- right action buttons  -->
            <div class="flex justify-between items-center">
                <!-- dark/light theme toggle -->
                <div class="w-10 flex justify-center">
                    <button
                        class="rounded-md focus:outline-none focus:shadow-outline-purple"
                        @click="store.isDark = !store?.isDark"
                    >
                        <i
                            v-if="!store?.isDark"
                            class="icon-moon text-lg"
                        />
                        <i
                            v-if="store?.isDark"
                            class="icon-sun text-2xl"
                        />
                    </button>
                </div>

                <!-- notifications menu -->
                <div class="w-10 relative">
                    <button
                        class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                        @click="isNotificationsMenuOpen = !isNotificationsMenuOpen"
                        @keydown.escape="isNotificationsMenuOpen = false"
                    >
                        <!-- bell -->
                        <i class="icon-bell text-lg" />

                        <!-- unread -->
                        <span class="absolute top-1 right-1 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800" />
                    </button>

                    <template v-if="isNotificationsMenuOpen">
                        <ul
                            @blur="isNotificationsMenuOpen = false"
                            @keydown.escape="isNotificationsMenuOpen = false"
                            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
                        >
                            <li class="flex">
                                <a
                                    class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    href="#"
                                >
                                    <span>Messages</span>
                                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">13</span>
                                </a>
                            </li>
                            <li class="flex">
                                <a
                                    class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    href="#"
                                >
                                    <span>Sales</span>
                                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">2</span>
                                </a>
                            </li>
                            <li class="flex">
                                <a
                                    class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    href="#"
                                >
                                    <span>Alerts</span>
                                </a>
                            </li>
                        </ul>
                    </template>
                </div>

                <!-- profile menu -->
                <div class="w-10 relative">
                    <button
                        class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                        @click="isProfileMenuOpen = !isProfileMenuOpen"
                        @keydown.escape="isProfileMenuOpen = false"
                    >
                        <img
                            class="object-cover w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                            alt=""
                        />
                    </button>
                    <template v-if="isProfileMenuOpen">
                        <ul
                            @blur="isProfileMenuOpen = false"
                            @keydown.escape="isProfileMenuOpen = false"
                            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                        >
                            <li class="flex">
                                <a
                                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    href="#"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li class="flex">
                                <a
                                    class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    href="#"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li class="flex">
                                <a
                                    class="cursor-pointer inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    @click="logOut"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { ref, computed, reactive, watchEffect, watch } from 'vue';
    import store from '../js/store.js';
    import emitter from '../js/mitt.js';

    export default {
        setup () {
            const isNotificationsMenuOpen = ref(false);
            const isProfileMenuOpen = ref(false);

            return {
                store,
                isNotificationsMenuOpen,
                isProfileMenuOpen,
                emitter
            };
        }
    }
</script>
