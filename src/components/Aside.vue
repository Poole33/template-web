<template>
    <div 
        :class="[
            'aside max-sm:hidden z-99 h-full py-1 px-2',
            { 'w-256px': !collapsed }
        ]"
    >
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :inline-collapsed="collapsed"
        >
            <template v-for="item in constRoutes">
                <a-menu-item
                    v-if="item.children && item.children.length == 1"
                    :key="item.redirect"
                    :title="item.name"
                >
                    <template #icon>
                        <component :is="item.icon"></component>
                    </template>
                    <router-link :to="item.redirect">
                        {{ item.name }}
                    </router-link>
                </a-menu-item>
                <a-sub-menu
                    v-else-if="item.children && item.children.length > 1"
                    :key="item.path"
                    :title="item.name"
                >
                    <template #icon>
                        <a-tooltip placement="top" :title="item.name">
                            <component :is="item.icon"></component>
                        </a-tooltip>
                    </template>
                    <a-menu-item
                        v-for="route in item.children"
                        :key="`${item.path}/${route.path}`"
                        :title="route.meta.name"
                    >
                        <router-link :to="`${item.path}/${route.path}`">
                            {{ route.meta.name }}
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>

        <div class="collapsed-btn" @click="collapsed = !collapsed">
            <RightOutlined v-show="!collapsed" />
            <LeftOutlined v-show="collapsed" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'
import { constRoutes } from '@/router/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()
let openKeys = ref([]) // 展开哪个tab
let selectedKeys = ref([route.path]) // 选中哪个item
let collapsed = ref(false) // 折叠aside

// 根据屏幕大小实时调整aside宽度
let shrink = !collapsed.value
let magnify = collapsed.value
function dynamicCollapsed() {
    // 只触发一次
    if (window.innerWidth < 991 && !shrink) {
        collapsed.value = true
        magnify = false
        shrink = true
    } 
    if (window.innerWidth >= 991 && !magnify) {
        collapsed.value = false
        magnify = true
        shrink = false
    }
}

onMounted(() => {
    dynamicCollapsed()
    window.addEventListener('resize', dynamicCollapsed)
})

onUnmounted(() => {
    window.removeEventListener('resize', dynamicCollapsed)
})
</script>

<style lang="scss" scoped>
.aside {
    background: var(--theme-bgSecondary);
    position: relative;

    .ant-menu {
        background: transparent;
    }

    :deep(.ant-menu-sub) {
        background: transparent !important;
    }

    .ant-menu-root {
        border-inline-end: none;
    }
}

.collapsed-btn {
    position: absolute;
    inset-block-start: 18px;
    z-index: 101;
    width: 24px;
    height: 24px;
    text-align: center;
    border-radius: 40px;
    inset-inline-end: -13px;
    transition: transform 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--theme-color);
    background-color: var(--theme-background);
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(25, 15, 15, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);

    :deep(svg) {
        width: 0.8em;
    }
}
</style>
